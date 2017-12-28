import createGraphQLClient from 'graphql-client'
import {fromJS, List} from 'immutable'
import {updateIssues} from './issues'

export const SERIES_UPDATE = 'SERIES_UPDATE'
export const SERIES_HAVE_BEEN_UPDATED = 'SERIES_HAVE_BEEN_UPDATED'

const client = createGraphQLClient({url: '/graphql'})

const _handleSeries = (series, dispatch, getState, nextAction) => {
  series = fromJS(series.map(s => {
    if(s.description) {
      s.description = s.description
        .replace(/<a(.+?)href="\/([^"]+)"/g, '<a$1href="https://comicvine.gamespot.com/$2" target="_blank"')
    }
    if(s.issues) {
      s.issues = s.issues.map(issue => {
        issue.volumeId = s.id
        return issue
      })
    }
    return s
  }))
  dispatch({type: SERIES_UPDATE, series})
  dispatch({type: SERIES_HAVE_BEEN_UPDATED, series: getState().get('series')})
  const issues = series.reduce((acc, serie) => {
    if(serie.get('issues')) return acc.concat(serie.get('issues'))
    return acc
  }, List())
  if(issues.size) dispatch(updateIssues(issues))
  if(typeof nextAction === 'function') dispatch(nextAction(series))
}

export const fetchSeries = (query, fields, nextAction) =>
  (dispatch, getState) => {
    if(typeof fields !== 'string') throw new Error('"fields" is required as a string')
    client.query(`{series(query: "${query}") {${fields}}}`)
      .then(({data: {series}}) => _handleSeries(series, dispatch, getState, nextAction))
  }

export const fetchSerie = (id, fields, nextAction) =>
  (dispatch, getState) => {
    if(typeof fields !== 'string') throw new Error('"fields" is required as a string')
    client.query(`{serie(id: ${id}) {${fields}}}`)
      .then(({data: {serie}}) => _handleSeries([serie], dispatch, getState, nextAction))
  }

import createGraphQLClient from 'graphql-client'
import {fromJS} from 'immutable'

export const SERIES_UPDATE = 'SERIES_UPDATE'
export const SERIES_HAVE_BEEN_UPDATED = 'SERIES_HAVE_BEEN_UPDATED'

const client = createGraphQLClient({url: '/graphql'})

export const fetchSeries = (fields, nextAction) =>
  (dispatch, getState) => {
    if(typeof fields !== 'string') throw new Error('"fields" is required as a string')
    client.query(`{series {${fields}}}`)
      .then(({data: {series}}) => {
        series = fromJS(series)
        dispatch({type: SERIES_UPDATE, series})
        dispatch({type: SERIES_HAVE_BEEN_UPDATED, series: getState().get('series')})
        if(typeof nextAction === 'function') dispatch(nextAction(series))
      })
  }

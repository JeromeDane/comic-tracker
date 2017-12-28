// import createGraphQLClient from 'graphql-client'
import {fromJS} from 'immutable'

export const ISSUES_UPDATE = 'ISSUES_UPDATE'
export const ISSUES_HAVE_BEEN_UPDATED = 'ISSUES_HAVE_BEEN_UPDATED'

export const updateIssues = issues =>
  (dispatch, getState) => {
    dispatch({type: ISSUES_UPDATE, issues: fromJS(issues)})
    dispatch({type: ISSUES_HAVE_BEEN_UPDATED, issues: getState().get('issues')})
  }

// const client = createGraphQLClient({url: '/graphql'})
//
// const _handleSeries = (issues, dispatch, getState, nextAction) => {
//   issues = fromJS(issues.map(s => {
//     if(s.description) {
//       s.description = s.description
//         .replace(/<a(.+?)href="\/([^"]+)"/g, '<a$1href="https://comicvine.gamespot.com/$2" target="_blank"')
//     }
//     return s
//   }))
//   dispatch({type: ISSUES_UPDATE, issues})
//   dispatch({type: ISSUES_HAVE_BEEN_UPDATED, issues: getState().get('issues')})
//   if(typeof nextAction === 'function') dispatch(nextAction(issues))
// }
//
// export const fetchSeries = (query, fields, nextAction) =>
//   (dispatch, getState) => {
//     if(typeof fields !== 'string') throw new Error('"fields" is required as a string')
//     client.query(`{issues(query: "${query}") {${fields}}}`)
//       .then(({data: {issues}}) => _handleSeries(issues, dispatch, getState, nextAction))
//   }
//
// export const fetchSerie = (id, fields, nextAction) =>
//   (dispatch, getState) => {
//     if(typeof fields !== 'string') throw new Error('"fields" is required as a string')
//     console.log(`{serie(id: ${id}) {${fields}}}`);
//     client.query(`{serie(id: ${id}) {${fields}}}`)
//       .then(({data: {serie}}) => _handleSeries([serie], dispatch, getState, nextAction))
//   }

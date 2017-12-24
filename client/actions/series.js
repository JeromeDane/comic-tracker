import createGraphQLClient from 'graphql-client'
import {fromJS} from 'immutable'

export const SERIES_UPDATE = 'SERIES_UPDATE'

const client = createGraphQLClient({url: '/graphql'})

export const fetchSeries = (fields) =>
  dispatch => {
    client.query(`{series {${fields}}}`)
      .then(({data: {series}}) => dispatch({type: SERIES_UPDATE, series: fromJS(series)}))
  }

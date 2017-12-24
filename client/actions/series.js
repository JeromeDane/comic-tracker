import createGraphQLClient from 'graphql-client'
import {fromJS} from 'immutable'

export const SERIES_UPDATE = 'SERIES_UPDATE'

const client = createGraphQLClient({url: '/graphql'})

export const fetchSeries = (fields) =>
  dispatch => {
    client.query(`{volumes {${fields}}}`)
      .then(({data: {volumes}}) => dispatch({type: SERIES_UPDATE, series: fromJS(volumes)}))
  }

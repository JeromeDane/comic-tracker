import {fetchSeries} from './series.js'

export const SEARCH_ADD_LOADING = 'SEARCH_ADD_LOADING'
export const SEARCH_REMOVE_LOADING = 'SEARCH_REMOVE_LOADING'
export const SEARCH_SET_QUERY = 'SEARCH_SET_QUERY'

export default query =>
  dispatch => {
    dispatch({type: SEARCH_SET_QUERY, query})
    dispatch({type: SEARCH_ADD_LOADING})
    dispatch(
      fetchSeries(
        query,
        'id name image {thumbUrl} publisher {id name} startYear countOfIssues',
        () => ({type: SEARCH_REMOVE_LOADING})
      )
    )
  }

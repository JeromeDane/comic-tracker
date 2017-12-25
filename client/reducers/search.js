import score from 'string-score'
import {fromJS} from 'immutable'
import {SEARCH_ADD_LOADING, SEARCH_REMOVE_LOADING, SEARCH_SET_QUERY} from '../actions/search'
import {SERIES_HAVE_BEEN_UPDATED} from '../actions/series'

const defaultState = {
  query: '',
  loading: 0,
  series: []
}

export default (state = fromJS(defaultState), {type, query, series}) => {
  if(type === SEARCH_ADD_LOADING) state = state.set('loading', state.get('loading') + 1)
  if(type === SEARCH_REMOVE_LOADING) state = state.set('loading', state.get('loading') - 1)
  if(type === SEARCH_SET_QUERY) state = state.set('query', query)
  if(type === SERIES_HAVE_BEEN_UPDATED || type === SEARCH_SET_QUERY) {
    state = state.set('series', series
      .map(s => s.set('score', score(s.get('name'), state.get('query'))))
      .filter(s => s.get('score') > .4)
      .sort((a, b) =>
        a.get('score') < b.get('score') || (
          a.get('score') === b.get('score') &&
          a.get('countOfIssues') < b.get('countOfIssues')
        ))
      .toArray()
    )
  }
  return state
}

import {Map} from 'immutable'
import {SERIES_UPDATE} from '../actions/series.js'

export default (state = Map(), {type, series}) => {
  if(type === SERIES_UPDATE) {
    series.forEach(s => {
      const id = s.get('id')
      state = state.set(id, state.get(id) ? state.get('id').deepMerge(s) : s)
    })
  }
  return state
}

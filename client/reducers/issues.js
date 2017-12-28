import {Map} from 'immutable'
import {ISSUES_UPDATE} from '../actions/issues.js'

export default (state = Map(), {type, issues}) => {
  if(type === ISSUES_UPDATE) {
    issues.forEach(s => {
      const id = s.get('id')
      state = state.set(id, state.get(id) ? state.get(id).mergeDeep(s) : s)
    })
  }
  return state
}

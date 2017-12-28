import {Map} from 'immutable'
import {USER_UPDATE} from '../actions/user'

export default (state = Map(), {type, user} = {}) => {
  if(type === USER_UPDATE) return user
  return state
}

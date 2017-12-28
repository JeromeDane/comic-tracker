import {fromJS} from 'immutable'

export const USER_UPDATE = 'USER_UPDATE'

export const setUser = user => {
  return {type: USER_UPDATE, user: fromJS(user)}
}

export const clearUser = () =>
  dispatch => {
    fetch('/api/session', {
      method: 'post',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    }).then(function(response) {
      return response.json()
    }).then(user => dispatch(setUser(user)))
  }

export const fetchUser = () =>
  dispatch => {
    fetch('/api/session', {
      credentials: 'include',
      headers: {'Accept': 'application/json'}
    }).then(response => response.json())
      .then(user => dispatch(setUser(user)))
  }

import 'reset-css/reset.css'
import {Map} from 'immutable'
import {createStore, applyMiddleware, compose} from 'redux'
import {combineReducers} from 'redux-immutable'
import thunk from 'redux-thunk'
import {h, render} from 'preact'
import {Provider} from 'react-redux'
import reducers from './reducers'
import App from './components/index.jsx'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers(reducers),
  Map(),
  composeEnhancers(applyMiddleware(thunk))
)

let root
const renderRoot = App => root = render(
  <Provider {...{store}}><App /></Provider>,
  document.body,
  root
)
renderRoot(App)

if(module.hot) {
  module.hot.accept('./index.jsx', () => {
    const App = require('./index.jsx')
    renderRoot(App)
  })
}

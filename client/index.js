import {h, render} from 'preact'
import App from './app.jsx'

let root
const renderRoot = App => root = render(<App />, document.body, root)
renderRoot(App)

if(module.hot) {
  module.hot.accept('./index.jsx', () => {
    const App = require('./index.jsx')
    renderRoot(App)
  })
}

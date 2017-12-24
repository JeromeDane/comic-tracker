import {h} from 'preact'
import {Component} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import style from './index.css'
import Search from './search.jsx'
import Series from './series.jsx'

export default class extends Component {
  render() {
    return (
      <div className={style.app}>
        <h1>Comic Tracker</h1>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={Search} />
            <Route exact={true} path="/series/:id" component={Series} />
          </Switch>
        </Router>
        <p>Powered by <a href="https://comicvine.gamespot.com" target="_blank">ComicVine</a></p>
      </div>
    )
  }
}

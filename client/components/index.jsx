import {h} from 'preact'
import {Component} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import style from './index.css'
import Search from './search.jsx'
import Home from './home.jsx'
import SeriesDetails from './series-details.jsx'
import Issue from './issue.jsx'

export default class extends Component {
  render() {
    return (
      <div className={style.app}>
        <h1>Comic Tracker</h1>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/search/" component={Search} />
            <Route exact={true} path="/search/:query" component={Search} />
            <Route exact={true} path="/series/:id" component={SeriesDetails} />
            <Route exact={true} path="/issue/:id" component={Issue} />
          </Switch>
        </Router>
        <p>Powered by <a href="https://comicvine.gamespot.com" target="_blank">ComicVine</a></p>
      </div>
    )
  }
}

import {h} from 'preact'
import {Component} from 'react' // eslint-disable-line
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import {connect} from 'react-redux'
import {clearUser, fetchUser, setUser} from '../actions/user'
import googleClientId from '../../lib/google-client-id'
import style from './index.css'
import Search from './search.jsx'
import Home from './home.jsx'
import SeriesDetails from './series-details.jsx'
import Issue from './issue.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleGoogleResponse = this.handleGoogleResponse.bind(this)
    this.handleGoogleLogout = this.handleGoogleLogout.bind(this)
  }
  render({user}) {
    user = (user && user.toJS())
    return (
      <div className={style.app}>
        <div style="float: right; width:; 200px">
          {user && user.name
            ? <p>Welcome, {user.name}!{' '}
              <GoogleLogout
                buttonText="Logout"
                onLogoutSuccess={this.handleGoogleLogout} />
            </p>
            : <GoogleLogin
              clientId={googleClientId}
              onSuccess={this.handleGoogleResponse}
              onFailure={this.handleGoogleResponse} />
          }
        </div>
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
  handleGoogleResponse(response) {
    if(!response.error) {
      fetch('/api/session', {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(Object.assign({}, response.profileObj, {googleToken: response.tokenId})),
        headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
        return response.json()
      }).then(this.props.setUser)
    }
    else console.log(response.error, response.details) // eslint-disable-line
  }
  handleGoogleLogout() {
    this.props.clearUser()
  }
  componentWillMount() {
    this.props.fetchUser()
  }
}

export default connect(
  state => ({
    user: state.get('user')
  }),
  {clearUser, fetchUser, setUser}
)(App)

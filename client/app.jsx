import {h} from 'preact'
import {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSeries} from './actions/series'
import style from './app.css'

class App extends Component {
  render({series}) {
    return (
      <div className={style.app}>
        <h1>Comic Tracker</h1>
        {series &&
          <ul style="width: 100%; float: left; clear: both;">
            {series.toArray().map(s => {
              const {name, countOfIssues, startYear, image: {thumbUrl}, publisher} = s.toJS()
              return (
                <li style="clear: left;">
                  <img src={thumbUrl} style="float: left; margin: 0 1em 1em 0;" />
                  {name} ({startYear}) - {countOfIssues} issue{countOfIssues === 1 ? '' : 's'}
                  <div>Published by {publisher.name}</div>
                </li>
              )
            })}
          </ul>
        }
        <p>Powered by <a href="https://comicvine.gamespot.com" target="_blank">ComicVine</a></p>
      </div>
    )
  }
  componentWillMount() {
    this.props.fetchSeries('id name publisher {name} image {thumbUrl}')
  }
}

export default connect(state => ({
  series: state.get('series')
}), ({fetchSeries}))(App)

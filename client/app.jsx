import {h, Component} from 'preact'
import {connect} from 'react-redux'
import {fetchSeries} from './actions/series'

class App extends Component {
  render({series}) {
    return (
      <div>
        <h1>Hello, World!</h1>
        {series &&
          <ul>
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

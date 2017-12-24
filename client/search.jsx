import {h} from 'preact'
import {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSeries} from './actions/series'

class Search extends Component {
  render({series}) {
    return (
      <section>
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
      </section>
    )
  }
  componentWillMount() {
    this.props.fetchSeries('id name publisher {name} image {thumbUrl}')
  }
}

export default connect(
  state => ({series: state.get('series')}),
  ({fetchSeries})
)(Search)

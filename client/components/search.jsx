import {h} from 'preact'
import {Component} from 'react'
import {connect} from 'react-redux'
import dashify from 'dashify'
import {Link} from 'react-router-dom'
import search from '../actions/search.js'

class Search extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }
  render({loading, series}) {
    return (
      <section>
        <p>Search:{' '}
          <input onKeyup={this.handleInput} />
          {loading && ' Loading ...'}
        </p>
        {series &&
          <ul style="width: 100%; float: left; clear: both;">
            {series.map(s => {
              const {id, name, countOfIssues, startYear, image: {thumbUrl}, publisher} = s.toJS()
              return (
                <li style="clear: left;">
                  <Link style="display: block;" to={`/series/${id}-${dashify(name)}-${dashify(publisher.name)}`}>
                    <img src={thumbUrl} style="float: left; margin: 0 1em 1em 0;" />
                    {name} ({startYear}) - {countOfIssues} issue{countOfIssues === 1 ? '' : 's'}
                    <div>Published by {publisher.name}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        }
      </section>
    )
  }
  handleInput(e) {
    this.props.search(e.target.value)
  }
}

export default connect(
  state => {
    const search = state.get('search')
    return {
      loading: Boolean(search.get('loading')),
      series: search.get('series')
    }
  },
  ({search})
)(Search)

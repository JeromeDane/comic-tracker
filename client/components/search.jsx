import {h} from 'preact'
import {Component} from 'react'
import {connect} from 'react-redux'
import dashify from 'dashify'
import debounce from 'debounce'
import {Link} from 'react-router-dom'
import search from '../actions/search.js'
import style from './search.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }
  render({loading, series}) {
    return (
      <section>
        <p>Search:{' '}
          <input onKeyup={debounce(this.handleInput, 500)} ref={elem => this.input = elem} />
          {loading && ' Loading ...'}
        </p>
        {series && <div className={style.list}>
          {series.map(s => {
            const {id, name, countOfIssues, startYear, image, publisher} = s.toJS()
            return (
              <div>
                <Link className={style.item} to={`/series/${id}-${name ? dashify(name) : ''}-${publisher ? dashify(publisher.name) : ''}`}>
                  <img src={image && image.iconUrl} className={style.icon} />
                  <div className={style.itemDetails}>
                    <div className={style.itemName} title={name}>{name}</div>
                    <div className={style.datePublisher}>{startYear} - {publisher && publisher.name}</div>
                    {countOfIssues} issue{countOfIssues === 1 ? '' : 's'}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>}
      </section>
    )
  }
  handleInput({target: {value}}) {
    value = value.replace(/^\s+/, '').replace(/\s+$/, '')
    history.replaceState(null, null, `/search/${encodeURIComponent(value)}`)
    if(value.length > 2) this.props.search(value)
  }
  componentDidMount() {
    const {query} = this.props.match.params
    if(query) {
      const decodedQuery = decodeURIComponent(query)
      this.props.search(decodedQuery)
      this.input.value = decodedQuery
    }
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

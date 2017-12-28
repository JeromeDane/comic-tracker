import {h} from 'preact'
import {Component} from 'react'
import {connect} from 'react-redux'
import dashify from 'dashify'
import {Link} from 'react-router-dom'
import {fetchSerie} from '../actions/series'
import searchStyle from './search.css'
import Crumbs from './crumbs.jsx'

class Series extends Component {
  render({series}) {
    const {name, description, publisher, startYear, countOfIssues, issues} = series ? series.toJS() : {},
          seriesName = name
    const sortedIssues = issues && issues.sort((a, b) => a.issueNumber > b.issueNumber ? 1 : -1)
      .filter(issue => issue.name)
    return name
      ? <section>
        <Crumbs>
          <Link to="/search">Search</Link>
          {name}
        </Crumbs>
        <h2>{name}</h2>
        <p>{startYear} - {publisher && `${publisher.name} -`} {countOfIssues} issues</p>
        <p dangerouslySetInnerHTML={{__html: description}} />
        <h3>Issues</h3>
        {sortedIssues && <div className={searchStyle.list}>
          {sortedIssues.map(({id, name, issueNumber, image, coverDate}) => {
            return (
              <div>
                <Link className={searchStyle.item} to={`/issue/${id}-${dashify(seriesName)}-${issueNumber}-${name ? dashify(name) : ''}`}>
                  <img src={image && image.iconUrl} className={searchStyle.icon} />
                  <div className={searchStyle.itemDetails}>
                    <div className={searchStyle.itemName} title={name}>#{issueNumber} - {name}</div>
                    {coverDate}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>}
      </section>
      : <p>Loading series setails ...</p>
  }
  componentWillMount() {
    this.props.fetchSerie(
      this.props.match.params.id.match(/^\d+/)[0],
      `id name description publisher {id name} startYear countOfIssues
        issues {id name issueNumber coverDate image {iconUrl}}
      `
    )
  }
}

export default connect(
  (state, props) => ({
    series: state.get('series').get(props.match.params.id.match(/^\d+/)[0])
  }),
  ({fetchSerie})
)(Series)

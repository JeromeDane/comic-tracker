import {h} from 'preact'
import {Component} from 'react'
import {connect} from 'react-redux'
import dashify from 'dashify'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {fetchSerie} from '../actions/series'
import style from './series-details.css'
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
        {countOfIssues && (!issues || issues.length < countOfIssues) &&
          <p>Loading ...</p>
        }
        {sortedIssues && <div className={style.list}>
          {sortedIssues.map(({id, name, issueNumber, image, coverDate}) => {
            return (
              <Link className={style.issue} to={`/issue/${id}-${dashify(seriesName)}-${issueNumber}-${name ? dashify(name) : ''}`}>
                <img src={image && image.smallUrl} className={style.icon} />
                <div className={style.itemDetails}>
                  <div>#{issueNumber} - {name}</div>
                  <div className={style.coverDate}>
                    {moment(coverDate).format('MMMM Do YYYY')}
                  </div>
                </div>
              </Link>
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
        issues {id name issueNumber coverDate image {smallUrl}}
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

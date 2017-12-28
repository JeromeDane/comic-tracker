import {h} from 'preact'
import {Component} from 'react' // eslint-disable-line
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchIssue} from '../actions/issues'
import Crumbs from './crumbs.jsx'
import SeriesLink from './links/series.jsx'

class Issue extends Component {
  render({issue}) {
    const {name, issueNumber, series, image, description} = (issue && issue.toJS()) || {}
    return (
      <section>
        <Crumbs>
          <Link to="/search">Search</Link>
          {series
            ? [<SeriesLink {...{series}}>{series.name}</SeriesLink>, `#${issueNumber} - ${name}`]
            : 'Loading ...'
          }
        </Crumbs>
        {issue
          ? <div>
            <h2>#{issueNumber} - {name}</h2>
            {image && image.smallUrl && <img src={[image.smallUrl]} />}
            <p dangerouslySetInnerHTML={{__html: description}} />
          </div>
          : <p>Loading ...</p>
        }
      </section>
    )
  }
  componentDidMount() {
    const {issue} = this.props
    if(!issue || typeof issue.description === 'undefined') {
      this.props.fetchIssue()
    }
  }
}

export default connect(
  (state, props) => ({
    issue: state.get('issues').get(props.match.params.id.match(/^\d+/)[0])
  }),
  (dispatch, props) => ({
    fetchIssue: () => {
      dispatch(fetchIssue(
        props.match.params.id.match(/^\d+/)[0],
        'id name description issueNumber image {smallUrl} series {id name}'
      ))
    }
  })
)(Issue)

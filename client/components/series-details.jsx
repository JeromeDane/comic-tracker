import {h} from 'preact'
import {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSerie} from '../actions/series'

class Series extends Component {
  render({series}) {
    const {name, publisher, image, startYear, countOfIssues} = series ? series.toJS() : {}
    return name
      ? <section>
        <img src={image.smallUrl} />
        <h2>{name} ({startYear})</h2>
        <p>{countOfIssues} issues</p>
        <p>Publisher: {publisher.name}</p>
      </section>
      : <p>Loading series setails ...</p>
  }
  componentWillMount() {
    this.props.fetchSerie(
      this.props.match.params.id.match(/^\d+/)[0],
      'id name image {smallUrl} publisher {id name} startYear countOfIssues'
    )
  }
}

export default connect(
  (state, props) => ({
    series: state.get('series').get(props.match.params.id.match(/^\d+/)[0])
  }),
  ({fetchSerie})
)(Series)

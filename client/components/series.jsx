import {h} from 'preact'
import {Component} from 'react'
import {connect} from 'react-redux'

class Series extends Component {
  render({series}) {
    const {name} = series ? series.toJS() : {}
    return (
      <section>
        {name
          ? <h2>{name}</h2>
          : <p>Loading series setails ...</p>
        }
      </section>
    )
  }
}

export default connect(
  (state, props) => ({
    series: state.get('series').get(props.match.params.id.match(/^\d+/)[0])
  })
)(Series)

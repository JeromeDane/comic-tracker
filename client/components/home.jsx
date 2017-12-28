import {h} from 'preact'
import {Component} from 'react' // eslint-disable-line
import {Link} from 'react-router-dom'

export default class extends Component {
  render() {
    return (
      <section>
        <p><Link to="/search">Search</Link></p>
      </section>
    )
  }
}

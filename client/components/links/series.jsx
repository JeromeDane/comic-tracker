import {h} from 'preact'
import {Component} from 'react' // eslint-disable-line
import {Link} from 'react-router-dom'
import dashify from 'dashify'

export default class extends Component {
  render({series, children, className}) {
    const {id, name} = typeof series.toJS === 'function' ? series.toJS() : series
    return (
      <Link className={className} to={`/series/${id}-${name ? dashify(name) : ''}`}>
        {children}
      </Link>
    )
  }
}

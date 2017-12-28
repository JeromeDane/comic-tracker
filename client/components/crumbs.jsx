import {h} from 'preact'
import {Component} from 'react'
import {Link} from 'react-router-dom'

export default class extends Component {
  render({children}) {
    return (
      <p>
        <Link to="/">Home</Link>
        {children.map(child => [' » ', child])}
      </p>
    )
  }
}

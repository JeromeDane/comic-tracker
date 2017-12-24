import {h} from 'preact'
import {Component} from 'react'
import style from './index.css'
import Search from './search.jsx'

export default class extends Component {
  render() {
    return (
      <div className={style.app}>
        <h1>Comic Tracker</h1>
        <Search />
        <p>Powered by <a href="https://comicvine.gamespot.com" target="_blank">ComicVine</a></p>
      </div>
    )
  }
}

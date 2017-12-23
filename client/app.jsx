import {h, Component} from 'preact'

export default class extends Component {
  render(unused, {series}) {
    return (
      <div>
        <h1>Hello, World!</h1>
        {series &&
          <ul>
            {series.map(({name, countOfIssues, startYear, image: {thumbUrl}, publisher}) => (
              <li style="clear: left;">
                <img src={thumbUrl} style="float: left; margin: 0 1em 1em 0;" />
                {name} ({startYear}) - {countOfIssues} issue{countOfIssues === 1 ? '' : 's'}
                <div>Published by {publisher.name}</div>
              </li>
            ))}
          </ul>
        }
      </div>
    )
  }
  componentDidMount() {
    fetch('/api').then(response => response.json().then(({results}) => {
      this.setState({series: results})
    }))
  }
}

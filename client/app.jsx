import {h, Component} from 'preact'
import createGraphQLClient from 'graphql-client'

const client = createGraphQLClient({url: '/graphql'})

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
    client.query(`{volumes {
      id
      name,
      publisher {name},
      image {thumbUrl}
    }}`).then(body => {
      this.setState({series: body.data.volumes})
    })
  }
}

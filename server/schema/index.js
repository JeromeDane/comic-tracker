const {makeExecutableSchema} = require('graphql-tools'),
      resolvers = require('./resolvers')

const typeDefs = `

  type Publisher {
    id: ID!
    name: String!
  }

  type Image {
    iconUrl: String
    thumbUrl: String
    smallUrl: String
  }

  type Series {
    id: ID!
    name: String!
    description: String
    publisher: Publisher
    image: Image
    startYear: Int
    countOfIssues: Int
    issues: [Issue!]
  }

  type Issue {
    id: ID!
    name: String
    description: String
    issueNumber: Int
    image: Image
    coverDate: String,
    volume: Int!
    series: Series
  }

  type Query {
    issues(series: Int!): [Issue!]!
    issue(id: ID!): Issue!
    series(query: String): [Series!]!
    serie(id: ID!): Series
  }
`

module.exports = makeExecutableSchema({typeDefs, resolvers})

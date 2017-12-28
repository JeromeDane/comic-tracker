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
    issueNumber: Int
    image: Image
    coverDate: String,
    volume: Int!
  }

  type Query {
    issues(series: Int): [Issue!]!
    series(query: String): [Series!]!
    serie(id: ID!): Series
  }
`

module.exports = makeExecutableSchema({typeDefs, resolvers})

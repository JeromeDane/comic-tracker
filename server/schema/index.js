const {makeExecutableSchema} = require('graphql-tools'),
      resolvers = require('./resolvers')

const typeDefs = `

  type Publisher {
    id: ID!
    name: String!
  }

  type Image {
    thumbUrl: String
    smallUrl: String
  }

  type Series {
    id: ID!
    name: String!
    thumbUrl: String,
    publisher: Publisher
    image: Image
    startYear: Int
    countOfIssues: Int
  }

  type Query {
    series(query: String): [Series!]!
    serie(id: ID!): Series
  }
`

module.exports = makeExecutableSchema({typeDefs, resolvers})

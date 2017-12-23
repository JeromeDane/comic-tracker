const {makeExecutableSchema} = require('graphql-tools'),
      resolvers = require('./resolvers')

const typeDefs = `

  type Publisher {
    id: ID!
    name: String!
  }

  type Image {
    thumbUrl: String
  }

  type Volume {
    id: ID!
    name: String!
    thumbUrl: String,
    publisher: Publisher
    image: Image
  }

  type Query {
    volumes: [Volume!]!
  }
`

module.exports = makeExecutableSchema({typeDefs, resolvers})

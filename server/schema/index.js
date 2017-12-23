const {makeExecutableSchema} = require('graphql-tools'),
      resolvers = require('./resolvers')

// Define your types here.
const typeDefs = `
  type Volume {
    id: ID!
    name: String!
  }

  type Query {
    volumes: [Volume!]!
  }
`

module.exports = makeExecutableSchema({typeDefs, resolvers})

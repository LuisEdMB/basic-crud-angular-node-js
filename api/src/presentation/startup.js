const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/types')
const resolvers = require('./graphql/resolvers')

const app = new ApolloServer({ typeDefs, resolvers })

module.exports = app
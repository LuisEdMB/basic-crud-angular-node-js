const Configuration = require('./config')
const { ApolloServer } = require('apollo-server')
const TypeGraphql = require('./src/graphql/types')
const ResolverGraphql = require('./src/graphql/resolvers')
const DatabaseMongodb = require('./src/database/database-mongodb')

const config = new Configuration()
const types = new TypeGraphql()
const resolvers = new ResolverGraphql()
const database = new DatabaseMongodb(config.DB_SERVER, config.DB_PORT, config.DB_CATALOG)

const app = new ApolloServer({ typeDefs: types.getTypes(), resolvers: resolvers.getResolvers() })

database.connect()

app.listen({ port: config.PORT }).then(({ url }) => {
    console.log(`🚀 Running on: ${ url }`)
})
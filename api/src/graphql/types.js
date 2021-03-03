const GraphQLDateTime = require('graphql-type-datetime')
const  { gql } = require('apollo-server')

class TypeGraphql {
    constructor() { }
    getTypes() {
        return gql`
            scalar DateTime
            
            type Author {
                id: ID,
                name: String,
                birth: DateTime,
                books: [Book]
            }
        
            type Book {
                id: ID,
                title: String,
                abstract: String,
                year: Int,
                author: Author
            }
        
            type Query {
                author(id: ID!): Author,
                book(id: ID!): Book,
                authors: [Author],
                books: [Book]
            }
        `
    }
}

module.exports = TypeGraphql
const GraphQLDateTime = require('graphql-type-datetime')

class AuthorType {
    constructor() { }
    getTypes() {
        return `
            scalar DateTime
            ${ this.#getTypesForQueries() }
            ${ this.#getTypesForMutations() }
        `
    }
    getQuery() {
        return `
            author(id: ID!): Author
            authors: [Author]
        `
    }
    getMutation() {
        return `
            createAuthor(author: AuthorInput!): Author
            updateAuthor(id: ID!, author: AuthorInput!): Author
        `
    }
    #getTypesForQueries() {
        return `
            type Author {
                id: ID
                name: String
                birth: DateTime
                active: Boolean
                books: [Book]
            }
        
            type Book {
                id: ID
                title: String
                abstract: String
                year: Int
            }
        `
    }
    #getTypesForMutations() {
        return `
            input AuthorInput {
                name: String
                birth: DateTime
                active: Boolean
                books: [BookInput]
            }

            input BookInput {
                id: ID
                title: String
                abstract: String
                year: Int
            }
        `
    }
}

module.exports = AuthorType
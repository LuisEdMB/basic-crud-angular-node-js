const  { gql } = require('apollo-server')

module.exports = gql`
    type Author {
        id: ID,
        name: String,
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
        author: Author,
        book: Book,
        authors: [Author],
        books: [Book]
    }
`
const  { gql } = require('apollo-server')
const AuthorType = require('./types/author-type')

class TypeGraphql {
    constructor() { 
        this.authorType = new AuthorType()
    }
    getAllTypes() {
        return gql`
            ${ this.authorType.getTypes() }

            type Query {
                ${ this.authorType.getQuery() }
            }

            type Mutation {
                ${ this.authorType.getMutation() }
            }
        `
    }
}

module.exports = TypeGraphql
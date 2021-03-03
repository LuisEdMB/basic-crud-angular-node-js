const AuthorResolver = require('./resolvers/author-resolver')

class ResolverGraphql {
    constructor() {
        this.authorResolver = new AuthorResolver()
    }
    getAllResolvers() {
        return {
            Query: {
                ...this.authorResolver.getQuery()
            },
            Mutation: {
                ...this.authorResolver.getMutation()
            }
        }
    }
}

module.exports = ResolverGraphql
const ApplicationServiceAuthor = require('../../application/services/service-author')
const BaseExecuteGraphql = require('./base')

class AuthorResolver extends BaseExecuteGraphql{
    constructor() {
        super()
        this.authorService = new ApplicationServiceAuthor()
    }
    getQuery() {
        return {
            author: (_, { id }) => this.execute(() => this.authorService.getAuthorById(id)),
            authors: () => this.execute(() => this.authorService.getAuthors())
        }
    }
    getMutation() {
        return {
            createAuthor: (_, { author }) => this.execute(() => this.authorService.createAuthor(author)),
            updateAuthor: (_, { id, author }) => this.execute(() => this.authorService.updateAuthor(id, author))
        }
    }
}

module.exports = AuthorResolver
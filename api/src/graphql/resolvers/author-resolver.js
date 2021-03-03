const ApplicationServiceAuthor = require('../../application/services/service-author')
const BaseExecuteGraphql = require('./base')

class AuthorResolver extends BaseExecuteGraphql{
    constructor() {
        super()
        this.authorService = new ApplicationServiceAuthor()
    }
    getQuery() {
        return {
            author: (_, args) => this.execute(() => {
                const { id } = args
                return this.authorService.getAuthorById(id)
            }),
            authors: () => this.execute(() => this.authorService.getAuthors())
        }
    }
    getMutation() {
        return {
            createAuthor: (_, args) => this.execute(() => {
                const { author } = args
                this.authorService.createAuthor(author)
            }),
            updateAuthor: (_, args) => this.execute(() => {
                const { id, author } = args
                this.authorService.updateAuthor(id, author)
            })
        }
    }
}

module.exports = AuthorResolver
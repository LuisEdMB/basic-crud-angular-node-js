const BaseGraphql = require('./base')
const ApplicationServiceAuthor = require('../application/services/service-author')
const ApplicationServiceBook = require('../application/services/service-book')

const serviceAuthor = new ApplicationServiceAuthor()
const serviceBook = new ApplicationServiceBook()

class ResolverGraphql extends BaseGraphql {
    getResolvers() {
        return {
            Query: {
                author: (_, args) => this.execute(() => {
                    const { id } = args
                    return serviceAuthor.getAuthorById(id)
                }),
                book: (_, args) => this.execute(() => {
                    const { id } = args
                    return serviceBook.getBookById(id)
                }),
                authors: () => this.execute(() => serviceAuthor.getAuthors()),
                books: () => this.execute(() => serviceBook.getBooks())
            }
        }
    }
}

module.exports = ResolverGraphql
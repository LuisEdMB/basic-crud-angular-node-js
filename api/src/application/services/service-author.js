const AuthorModel = require('../../domain/models/author')

class ApplicationServiceAuthor {
    constructor() {
        this.author = new AuthorModel().getModel()
    }
    async getAuthors() {
        return await this.author.find({}).then(authors => authors).catch(error => { throw error })
    }
    async getAuthorById(id) {
        return await this.author.findOne({ _id: id }).then(author => author).catch(error => { throw error })
    }
    async createAuthor(author) {
        console.log(author)
    }
    async updateAuthor(id, author) {
        console.log(id, author)
    }
}

module.exports = ApplicationServiceAuthor
const AuthorModel = require('../../domain/models/author')
const DomainServiceAuthor = require('../../domain/services/service-author')
const ApplicationException = require('../../domain/exceptions/application-exception')
const { processEnums } = require('../../domain/enums/enums')

class ApplicationServiceAuthor {
    constructor() {
        this.author = new AuthorModel().getModel()
        this.serviceAuthor = new DomainServiceAuthor()
    }
    async getAuthors() {
        return await this.author.find({}).then(authors => authors).catch(error => { throw error })
    }
    async getAuthorById(id) {
        return await this.author.findOne({ _id: id }).then(author => author).catch(error => { throw error })
    }
    async createAuthor(author) {
        var newAuthor = this.serviceAuthor.createAuthor(author)
        return await newAuthor.save().then(author => author).catch(error => { throw error })
    }
    async updateAuthor(id, author) {
        var existAuthor = await this.author.findOne({ _id: id }).then(author => author).catch(error => { throw error })
        if (!existAuthor) throw new ApplicationException(`Author with ID "${ id }" not found.`)
        switch(author.process){
            case processEnums.UPDATE:
                return this.#modifyAuthor(existAuthor, author)
            case processEnums.ENABLE:
                return this.#enableAuthor(existAuthor)
            case processEnums.DISABLE:
                return this.#disableAuthor(existAuthor)
        }
        return await this.author.findOne({ _id: id }).then(author => author).catch(error => { throw error })
    }
    async #modifyAuthor(author, dataAuthor) {
        var existAuthor = this.serviceAuthor.modifyAuthor(author, dataAuthor)
        await existAuthor.updateOne(existAuthor).catch(error => { throw error })
    }
    async #enableAuthor(author) {
        var existAuthor = this.serviceAuthor.enableAuthor(author)
        await existAuthor.updateOne(existAuthor).catch(error => { throw error })
    }
    async #disableAuthor(author) {
        var existAuthor = this.serviceAuthor.disableAuthor(author)
        await existAuthor.updateOne(existAuthor).catch(error => { throw error })
    }
}

module.exports = ApplicationServiceAuthor
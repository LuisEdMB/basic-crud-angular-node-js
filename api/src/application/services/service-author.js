const AuthorModel = require('../../domain/models/author')
const DomainServiceAuthor = require('../../domain/services/service-author')
const ApplicationException = require('../../domain/exceptions/application-exception')
const { processEnums } = require('../../domain/enums/enums')
const Utils = require('../../domain/utils/utils')

class ApplicationServiceAuthor {
    constructor() {
        this.author = new AuthorModel().getModel()
        this.serviceAuthor = new DomainServiceAuthor()
        this.utils = new Utils()
    }
    async getAuthors() {
        return await this.author.find({}).then(authors => authors).catch(error => { throw error })
    }
    async getAuthorById(id) {
        var author = await this.author.findOne({ _id: id }).then(author => author).catch(error => { throw error })
        if (this.utils.isNullOrUndefinedOrEmpty(author)) throw new ApplicationException(`Author with ID "${ id }" not found.`)
        return author
    }
    async createAuthor(author) {
        var newAuthor = this.serviceAuthor.createAuthor(author)
        return await newAuthor.save().then(author => author).catch(error => { throw error })
    }
    async updateAuthor(id, author) {
        var existAuthor = await this.getAuthorById(id)
        switch(author.process){
            case processEnums.UPDATE:
                await this.#modifyAuthor(existAuthor, author)
                break
            case processEnums.ENABLE:
                await this.#enableAuthor(existAuthor)
                break
            case processEnums.DISABLE:
                await this.#disableAuthor(existAuthor)
                break
            default:
                throw new ApplicationException('Process not valid!')
        }
        return await this.getAuthorById(id)
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
const ApplicationException = require('../exceptions/application-exception')
const AuthorModel = require('../models/author')
const Utils = require('../utils/utils')

class DomainServiceAuthor {
    constructor() { 
        this.author = new AuthorModel()
        this.utils = new Utils()
    }
    createAuthor(author) {
        this.#validateAuthor(author)
        return this.author.createAuthor(author.name, author.birth, author.books)
    }
    modifyAuthor(author, dataAuthor) {
        this.#validateAuthor(dataAuthor)
        return this.author.modifyAuthor(author, dataAuthor.name, dataAuthor.birth, dataAuthor.books)
    }
    enableAuthor(author) {
        this.#validateAuthorAlreadyEnabled(author)
        return this.author.enableAuthor(author)
    }
    disableAuthor(author) {
        this.#validateAuthorAlreadyDisabled(author)
        return this.author.disableAuthor(author)
    }
    #validateAuthor(author){
        if (this.utils.isNullOrUndefinedOrEmpty(author)) throw new ApplicationException('No data found for "Author"!')
        if (this.utils.isNullOrUndefinedOrEmpty(author.name)) throw new ApplicationException('Field "Name" is empty!')
        if (this.utils.isNullOrUndefinedOrEmpty(author.birth)) throw new ApplicationException('Field "Birth" is empty!')
        if ((author.books?.length || 0 ) <= 0) throw new ApplicationException('No "Books" found for author!')
        author.books.forEach(book => this.#validateBook(book))
    }
    #validateBook(book) {
        if (this.utils.isNullOrUndefinedOrEmpty(book.title)) throw new ApplicationException('Books must have a "title"!')
        if (this.utils.isNullOrUndefinedOrEmpty(book.abstract)) throw new ApplicationException('Books must have a "abstract"!')
        if (this.utils.isIntegerEmpty(book.year)) throw new ApplicationException('Books must have a "year"!')
    }
    #validateAuthorAlreadyEnabled(author) {
        if (this.utils.isNullOrUndefinedOrEmpty(author)) throw new ApplicationException('No data found for "Author"!')
        if (author.active) throw new ApplicationException('Author already enabled!')
    }
    #validateAuthorAlreadyDisabled(author) {
        if (this.utils.isNullOrUndefinedOrEmpty(author)) throw new ApplicationException('No data found for "Author"!')
        if (!author.active) throw new ApplicationException('Author already disabled!')
    }
}

module.exports = DomainServiceAuthor
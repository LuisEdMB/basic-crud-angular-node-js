const mongodb = require('mongoose')

class Author {
    constructor() { }
    getModel() {
        return mongodb.model('author', new mongodb.Schema({
            name: {
                type: String,
                required: true
            },
            birth: {
                type: Date,
                required: true
            },
            active: {
                type: Boolean,
                required: true
            },
            books: [{
                title: {
                    type: String,
                    required: true
                },
                abstract: {
                    type: String,
                    required: true
                },
                year: {
                    type: Number,
                    required: true
                }
            }]
        }, { collection: 'author' }))
    }
    createAuthor(name, birth, books){
        return mongodb.models.author({
            name: name,
            birth: birth,
            active: true,
            books: books
        })
    }
    modifyAuthor(author, name, birth, books) {
        author.name = name
        author.birth = birth
        author.books = books
        return author
    }
    enableAuthor(author) {
        author.active = true
        return author
    }
    disableAuthor(author) {
        author.active = false
        return author
    }
}

module.exports = Author
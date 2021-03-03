const mongodb = require('mongoose')

class Author {
    constructor() { }
    getModel() {
        return new mongodb.model('author', new mongodb.Schema({
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
        }))
    }
}

module.exports = Author
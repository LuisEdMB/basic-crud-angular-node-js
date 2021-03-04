const { ApolloError } = require('apollo-server')

class ApplicationException extends ApolloError {
    constructor(message, code = "01") {
        super(message, code)
        Object.defineProperty(this, 'name', { value: 'ApplicationException' })
    }
}

module.exports = ApplicationException
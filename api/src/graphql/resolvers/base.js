const ApplicationException = require('../../domain/exceptions/application-exception')
const { ApolloError } = require('apollo-server') 

class BaseExecuteGraphql {
    async execute(action) {
        try {
            return await action()
        }
        catch(exception) {
            if (exception instanceof ApplicationException) throw exception
            throw new ApolloError(`An error has ocurred on server: ${exception}`, '500')
        }
    }
}

module.exports = BaseExecuteGraphql
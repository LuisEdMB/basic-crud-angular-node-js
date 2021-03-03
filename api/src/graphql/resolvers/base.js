const ApplicationException = require('../../domain/exceptions/application-exception')

class BaseExecuteGraphql {
    async execute(action) {
        try {
            return action()
        }
        catch(exception) {
            if (exception instanceof ApplicationException) throw exception
            throw {
                'message': `Server error: ${ exception }`,
                'code': '500'
            }
        }
    }
}

module.exports = BaseExecuteGraphql
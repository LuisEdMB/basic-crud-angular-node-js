class BaseExecuteGraphql {
    async execute(action) {
        try {
            return action()
        }
        catch(exception) {
            
        }
    }
}

module.exports = BaseExecuteGraphql
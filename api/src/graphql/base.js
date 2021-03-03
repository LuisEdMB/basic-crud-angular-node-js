class BaseGraphql {
    constructor() { }
    async execute(action) {
        try {
            return action()
        }
        catch(exception) {
            
        }
    }
}

module.exports = BaseGraphql
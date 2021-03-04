class Utils {
    constructor() { }
    isNullOrUndefinedOrEmpty(value) {
        return value === null || value === undefined || value === ''
    }
    isIntegerEmpty(value){
        return value <= 0
    }
}

module.exports = Utils
class ApplicationException {
    constructor(message, code = "01") {
        this.message = message
        this.code = code
    }
}

module.exports = ApplicationException
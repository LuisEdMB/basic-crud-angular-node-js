const mongodb = require('mongoose')

class DatabaseMongodb {
    constructor(server, port, catalog) {
        this.SERVER = server
        this.PORT = port
        this.CATALOG = catalog
        this.connection = null
    }
    connect() {
        if (this.connection) return this.connection
        return mongodb
            .connect(this.#getStringConnection(), { useNewUrlParser: true, useUnifiedTopology: true })
            .then(connection => this.connection = connection)
            .catch(error => console.log(error))
    }
    #getStringConnection() {
        return `mongodb://${this.SERVER}:${this.PORT}/${this.CATALOG}`
    }
}

module.exports = DatabaseMongodb
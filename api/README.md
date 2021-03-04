## Node.js + Express + MongoDB + GraphQL

### The MongoDB database must have the following schema:

    collection: "library" {
        document: "author" {
            _id: ObjectId
            name: String
            birth: Date
            active: Boolean
            books: Array {
                _id: ObjectId
                title: String
                abstract: String
                year: Number
            }
        }
    }

#

### Note: See "config.js" file for application's configuration.
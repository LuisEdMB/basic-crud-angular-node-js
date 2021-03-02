const startup = require('./src/presentation/startup')
const config = require('./config')

startup.listen({ port: config.PORT }).then(({ url }) => {
    console.log(`🚀 Running on: ${ url }`)
})
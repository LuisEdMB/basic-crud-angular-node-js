const express = require("express")
const config = require("./config")

const app = express()

app.listen(config.PORT, () => {
    console.log(`Running on port ${config.PORT}!!`)
})
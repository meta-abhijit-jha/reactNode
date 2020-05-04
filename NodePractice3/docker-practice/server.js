'use-strict'

const express = require('express')

const PORT = 8080
const HOST = '0.0.0.0'
const app = express()

app.get('/', (request, response) => {
    response.send("Hello World from Abhijit")
}).listen(PORT, HOST)

console.log("Running on http://" + HOST + ":" + PORT)

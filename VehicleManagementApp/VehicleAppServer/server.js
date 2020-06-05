const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.port || 9009

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/home', (req, res) => {
    res.json({
        message: "Hello! from Vehicle Management App"
    })
})

require('./routes/routes')(app)

app.listen(port, () => {
    console.log("server started on PORT "+port)
})
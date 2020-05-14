const express = require('express')
const bodyParser = require('body-parser')

//To enable cross origin resource sharing
const cors = require('cors')

const app = express()

//origin of host(from where this wep-page can be accessed) 
var corsOptions = {
    origin: "http://localhost:8081" //can be a webpage also
}

//enable cors middleware
app.use(cors(corsOptions))

//Parsing json requests
app.use(bodyParser.json())

//Parsing x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./models")

//To call sequelize sync
db.sequelize.sync()

//force=true coz it will drop the table if it already exists.
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db")
// })

//home route
app.get('/', (req, res) => {
    res.json({
        message: "Hello! from CRUD App"
    })
})

//Including routes for various protocols
require('./routes/tutorial.routes')(app)

//port, request listener
//port can be from environment variable or 8008
const PORT = process.env.PORT || 8008
app.listen(PORT, () => {
    console.log('Server Started on port ' + PORT)
})
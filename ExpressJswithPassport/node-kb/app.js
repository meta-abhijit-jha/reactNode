const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const config = require('./config/database')
const passport = require('passport')

//Connecting DB
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection

//Check Connection
db.once('open', () => {
    console.log("Connected to mongodb")
})

//Check for DB errors
db.on('error', (err) => {
    console.log(err)
})

//Init App
const app = express()

//Bring in Models
let Article = require('./models/article')

//Load View Engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

//Body parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
})

//Passport Config.
require('./config/passport')(passport)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//To set Global user variable
app.get('*', (req, res, next)=>{
    res.locals.user = req.user || null
    next()
})

//Home Route
app.get("/", (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err)
        } else {
            res.render('index', {
                title: "Add Article",
                articles: articles
            })
        }

    })
})

//Route Files
let articles = require('./routes/articles')
let users = require('./routes/users')
app.use('/articles', articles)
app.use('/users', users)

//Start Server
app.listen('8090', () => {
    console.log("Server Started")
})
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()

const { check, validationResult } = require('express-validator')

//middleware(must be ordered)
// var logger = function (req, res, next) {
//     console.log("logging.....")
//     next()
// }

//to run middleware
//app.use(logger)

//view Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
    res.locals.errors = null
    next()
})
//JSON Object
var users = [
    {
        id: "1",
        first_name: "Abhijit",
        last_name: "Jha",
        email: "abhijit.jha@metacube.com"
    },
    {
        id: "2",
        first_name: "Akshay",
        last_name: "Kumar",
        email: "akshay.kumar@metacube.com"
    },
    {
        id: "1",
        first_name: "Ayush",
        last_name: "Pandey",
        email: "ayush.pandey@metacube.com"
    }
]

app.get('/', function (req, res) {

    //To send response normally
    //res.send("<h1>Ciao Amigo</h1>")

    //To send response in JSON
    //res.json(people)

    //To render page from view
    res.render('index', {
        title: 'Customers',
        users: users
    })
})

app.post('/users/add', [
    check('first_name', "Must not be empty").notEmpty(),
    check('last_name', "Must not be empty").notEmpty(),
    check('email', "Must not be empty").notEmpty()
], function (req, res) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: errors
        })
        console.log(errors)
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        console.log(newUser)
    }
})

app.listen(3000, function () {
    console.log("Server Started")
})


//command : npx nodemon
//It automatically relaunch server on any code change


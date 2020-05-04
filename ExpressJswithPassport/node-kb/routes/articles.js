const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

//Bring in Models
let Article = require('../models/article')
let User = require('../models/user')


//Add Route
router.get('/add', ensureAuth, (req, res) => {
    res.render('add_article', {
        title: "Add Article"
    })
})

//Load Edit Form
router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if(article.author != req.user._id) {
            req.flash("danger",'Not Authorized to Access')
            res.redirect('/')
        }
        res.render('edit_article', {
            article: article,
            title: "Edit Article"
        })
    })
})

//Add Submit POST Route
router.post('/add', [
    check('title', "Title must not be empty").notEmpty(),
    //check('author', "Author must not be empty").notEmpty(),
    check('body', "Body must not be empty").notEmpty()
], (req, res) => {

    const errors = validationResult(req)
    let article = new Article()

    if (!errors.isEmpty()) {
        res.render('add_article', {
            title: "Add Article",
            errors: errors
        })
        console.log(errors)
    } else {
        article.title = req.body.title
        article.author = req.user._id
        article.body = req.body.body

        article.save((err) => {
            if (err) {
                console.log(err)
                return
            } else {
                req.flash('success', 'Article Added')
                res.redirect('/')
            }
        })
    }


})

//Update Article POST Route
router.post('/edit/:id',ensureAuth, (req, res) => {
    let article = {}
    article.title = req.body.title
    article.author = req.body.author
    article.body = req.body.body

    let query = { _id: req.params.id }

    Article.updateOne(query, article, (err) => {
        if (err) {
            console.log(err)
            return
        } else {
            req.flash('success', 'Article Updated')
            res.redirect('/')
        }
    })
})

//Get Single Article
router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        User.findById(article.author, (err, user)=>{
            res.render('article', {
                article: article,
                author: user.name
            })
        })
        
    })
})

//Access Control(Protect UnAuth Access)
function ensureAuth(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    } else {
        req.flash("danger", "Please Login")
        res.redirect('/users/login')
    }
}

module.exports = router
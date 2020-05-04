const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const passport = require('passport')

//Bring in Models
let User = require('../models/user')

//Register Form
router.get('/register', (req, res)=>{
    res.render('register')
})

//Registration Process
router.post('/register', [
    check('name', "Namee must not be empty").notEmpty(),
    check('email', "Email must not be empty").notEmpty(),
    check('email', "Invalid Email").isEmail(),
    check('username', "Username must not be empty").notEmpty(),
    check('password', "Password must not be empty").notEmpty(),
    check('password2', "Confirm Password must not be empty").notEmpty(),
    //check('password2', "Passwords do not match").equals(pass2)
], (req, res)=> {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.render('register', {
            errors: errors
        })

    } else {

        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) {
                    console.log(err)
                }
                newUser.password = hash
                newUser.save((err)=>{
                    if(err) {
                        console.log(err)
                        return
                    } else {
                        req.flash('success', 'Successfully Registered')
                        res.redirect('login')
                    }
                })
            })
        })
    }


})

//Login Form
router.get('/login', (req, res)=>{
    res.render('login')
})

//Login Process
router.post('/login',(req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

//Logout Process
router.get("/logout", (req,res)=>{
    req.logout()
    req.flash("success", "You are logged out")
    res.redirect('login')
})

module.exports = router
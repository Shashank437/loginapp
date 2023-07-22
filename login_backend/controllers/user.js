const bcrypt = require('bcrypt');


// Require models folder 
const User = require('../models/User');


// Registration 
const registerController = (req, res, next) => {
    if(req.body.email === '' || req.body.password === ''){
        res.status(400).json ({
            message: 'Please enter email/password'
        })
    }else{
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err) {
                res.json ({
                    error: err 
                })
            }
            User.findOne ({
                email: req.body.email,
            }).then((user) => {
                if(user) {
                    res.status(400).json ({
                        message: 'User already exist! Please login',
                    })
                }else{
                    let user = new User ({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    })
                    user.save()
                        .then(result => {
                            res.status(201).json ({
                                message: 'User created Successfully',
                                user: result
                            })
                        })
                        .catch((err) => {
                            res.json ({
                                err
                            })
                        })
                }
            })
        })
    }
}

// Login
const loginController = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    if(email === '' || password === ''){
        res.status(400).json ({
            message: 'Please enter email/password'
        })
    }else{
        User.findOne ({
            email
        }).then((user) => {
            if(user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        res.status(400).json ({
                            message: 'Error Occured'
                        })
                    }
                    if(result) {
                        res.status(200).json ({
                            message: 'Login successfull'
                        })
                    } else {
                        res.status(400).json ({
                            message: 'Login failed. password doesn\'t match' 
                        })
                    }
                })
            } else {
                res.status(404).json ({
                    message: 'User not found'
                })
            }
        })
    }   
}


const getAllUser = (req, res, next) => {
    User.find()
        .then(users => {
            res.json ({
                users
            })
        })
        .catch(error => {
            res.json ({
                error
            })
        })
}

module.exports = {
    registerController,  
    loginController,  
    getAllUser
}


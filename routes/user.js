const express =require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const router = express.Router();
//register user route
router.post('/register', (req, res, next) =>{
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    


    User.addUser(newUser, (err, User) =>{
        if(err){
            res.json({success: false, msg: 'failed to register user'});
        }
        else{
            res.json({success:true, msg:'you are now registered'});
        }
    }); 
    //res.send('i am at the register   '+ req.body.name);
});

// Dashboard Route

router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log('i got here');
    res.json({user:req.user});
});


module.exports = router;




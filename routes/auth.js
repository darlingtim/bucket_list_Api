const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
//const loginUser = require('../model/loginUser')
const User = require('../model/user');
const config = require('../config/database');


//login route
router.post('/login', (req, res, next) =>{

    const username = req.body.username;
    const password = req.body.password;


    User.getUserByUsername(username, (err, user) =>{
        if(err){
            console.error(err);
        }
        else if(!user){
            res.json({success:false, msg: 'user not found'});
        }
        

        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){
                console.error(err);
            }
            if(isMatch){
                
                const token = jwt.sign(user.toJSON(), config.secret ,{expiresIn: '604800'}

                );

                res.json({
                    success: true,
                    token: 'JWT '+ token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else{
                res.json({success:false, msg: 'Wrong password'});
            }
        });

    });

      
});

// log Out Route
router.post('/logout', passport.authenticate('jwt',{session:false}), (req, res, next)=>{
    res.send(req.user.name + " is logged out")
})
module.exports = router;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user');
const config = require('../config/database');
const jwt= require('jsonwebtoken');


module.exports = function(passport){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('Token');
    opts.secretOrKey = config.secret;
    //opts.issuer = 'accounts.examplesoft.com';
    //opts.audience = 'yoursite.net';
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        
        User.getUserById( jwt_payload._id, (err, user) =>{
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}
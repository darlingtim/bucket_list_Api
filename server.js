const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const bcrpt = require('bcryptjs');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to Database
mongoose.connect(config.database, {useNewUrlParser:true});

// on Connected to database
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

//on Error in connecting to database
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();
const router = express.Router();

const api = require('./routes/api');
const user =require('./routes/user');
const auth = require('./routes/auth');
const bucketlists = require('./routes/bucketlists');
//Port Number
const port = 3000;

// Cors Middleware
app.use(cors());

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({urlencoded:true, extended:false})); 



// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// route direction
app.use('/v1/api', api);
app.use('/user', user);
app.use('/auth', auth);
app.use('/bucketlists', passport.authenticate('jwt', {session:false}), bucketlists)

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid end Point');
});

// start server
app.listen(port, () => {
    console.log('server started on port ' + port);

});
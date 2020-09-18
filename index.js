require('dotenv/config');
const express = require('express');
var bodyParser = require('body-parser');
const authRoute = require('./routes/auth.route');
const postRoute = require('./routes/posts.route');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const app = express();

const port = 3500;

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/user', authRoute);
app.use('/api', postRoute);


//connect mongodb
mongoose.connect(process.env.DB_CONNECTION, function(){
    console.log('connected mongodb');
});
  
  //listen for requests
  app.listen(port, function(){
    console.log('listening on port '+port);
})
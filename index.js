require('dotenv/config');
const express = require('express');
var bodyParser = require('body-parser');
const authRoute = require('./routes/auth.route');

const app = express();
const port = 3500;

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', authRoute);

//connect mongodb
mongoose.connect(process.env.DB_CONNECTION, function(){
    console.log('connected mongodb');
});
  
  //listen for requests
  app.listen(port, function(){
    console.log('listening on port '+port);
})
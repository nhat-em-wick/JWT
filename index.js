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
const userModel = require('./models/user.model');
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/user', authRoute);
app.use('/api', postRoute);
app.get('/users', async function(req, res){
  let page = parseInt(req.query.page) || 1;
  let perPage = 3;
  const start = (page - 1)*perPage;
  const end = page*perPage;
  let totalUser = await userModel.find();
  let totalPages = Math.ceil(totalUser.length / perPage);

  let users = await (await userModel.find()).slice(start,end);

  res.render('index',{users: users, totalPages: totalPages});
})

//connect mongodb
mongoose.connect(process.env.DB_CONNECTION, function(){
    console.log('connected mongodb');
});
  
  //listen for requests
  app.listen(port, function(){
    console.log('listening on port '+port);
})
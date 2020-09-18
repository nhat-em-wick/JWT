const router = require('express').Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation/user.validate');

router.post('/register', async function(req, res){
    // validation data
    const {error} = registerValidation(req.body);
    if(error) res.status(400).send(error.details[0].message);

    // checking if user is already in the database
    const emailExist = await userModel.findOne({email: req.body.email});
    if(emailExist) res.status(400).send('Email already exits');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create user
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        let saveUSer = await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.sendStatus(400);
    }
});

router.post('/login', async function(req, res){
    // validation data
    const {error} = loginValidation(req.body);
    if(error) res.status(400).send(error.details[0].message);

    // checking if email exist
    const user = await userModel.findOne({email: req.body.email});
    if(!user) res.status(400).send('Email is not found!');
    // password is correct
    const valiPass = await bcrypt.compare(req.body.password, user.password);
    if(!valiPass) res.status(400).send('Password is wrong!');

    // create and assign a token
    const token = await jwt.sign({_id: user._id},  process.env.TOKEN_SECRET )
    //res.header('auth-token', token).send(token);
    
    //create cookie
    res.cookie('access_token', token);
    res.send('login!!!')
});



module.exports = router;
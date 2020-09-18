const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/posts', verify, function(req, res){
    res.send(req.user);
})

module.exports = router;

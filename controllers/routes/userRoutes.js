const express = require('express');
const router = express.Router();
const userController = require('../user-controller');

router.post('/register', userController.createUser);

router.post('/login', userController.loginUser);

router.post('/logout', userController.logoutUser);

router.get('/signup', (req, res) => {
    res.render('registration'); 
});

router.get('/registered-success', (req, res) => {
    res.render('registered-success', {
        username: req.session.username
    });
});

module.exports = router;



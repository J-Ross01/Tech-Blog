const express = require('express');
const router = express.Router();
const commentController = require('../comment-controller');

router.post('/', commentController.createComment);


module.exports = router;

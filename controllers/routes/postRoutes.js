const express = require('express');
const router = express.Router();
const postController = require('../post-controller');

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/dashboard', postController.getUserDashboard);

module.exports = router;

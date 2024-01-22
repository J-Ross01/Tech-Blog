const { Post } = require('../models');

const postController = {
  createPost: async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
      });
      res.status(200).json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = postController;

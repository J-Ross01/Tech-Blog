const { Post, User } = require('../models/post');

const postController = {
  createPost: async (req, res) => {
    try {
      if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: 'Title and content are required.' });
      }

      const userId = req.session.userId || req.user.id;

      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: userId 
      });

      res.status(200).json({
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
        userId: newPost.userId
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{
          model: User,
          attributes: ['username'] 
        }]
      });
      res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      const updatedPost = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (!updatedPost[0]) {
        res.status(404).json({ message: 'Post not found or no update was made' });
        return;
      }

      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const deletedPost = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!deletedPost) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }

      res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserDashboard: async (req, res) => {
    try {
      const userId = req.session.userId || req.user.id; 

      const userPosts = await Post.findAll({
        where: { userId: userId },
        include: [{
          model: User,
          attributes: ['username'] 
        }]
      });

      res.status(200).json(userPosts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = postController;

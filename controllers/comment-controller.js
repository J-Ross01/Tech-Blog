const { Comment } = require('../models/comment');

const commentController = {
  createComment: async (req, res) => {
    try {
      if (!req.session.userId) {
        res.status(401).json({ message: 'Please log in to comment' });
        return;
      }

      const newComment = await Comment.create({
        content: req.body.content,
        userId: req.session.userId, 
        postId: req.body.postId,
      });

      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = commentController;

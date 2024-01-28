const { User } = require('../models/user');

const userController = {
  createUser: async (req, res) => {
    try {
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });


      res.status(200).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
      }

      const validPassword = await user.checkPassword(password);

      if (!validPassword) {
        res.status(400).json({ message: 'Invalid password' });
        return;
      }

      req.session.save(() => {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.json({ user: user, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  logoutUser: (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },
};

module.exports = userController;

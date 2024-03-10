const { User } = require('../models/user'); 
const bcrypt = require('bcrypt');


console.log('User model:', User);

const userController = {
  createUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      console.log('Finding existing user with email:', email);
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const newUser = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10)
      });

      req.session.userId = newUser.id;
      req.session.loggedIn = true;

      res.redirect('/registered-success');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Trying to log in user:', email); 
  
      const user = await User.findOne({ where: { email } });
      console.log('User found:', user); 
  
      if (!user) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      console.log('Password from request:', password); 
      console.log('Hashed password from user:', user.password); 
  
      if (!password || !user.password) {
        console.log('One of the required password fields is missing.');
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      req.session.save(() => {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
  
        res.redirect('/dashboard');
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error during login' });
    }
  },
  

  logoutUser: (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.redirect('/');
      });
    } else {
      res.status(404).json({ message: 'No active session' });
    }
  },
};

module.exports = userController;
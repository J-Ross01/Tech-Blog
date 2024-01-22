const express = require('express');
const { engine } = require('express-handlebars'); 
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const postRoutes = require('./routes/post-routes');

const sequelize = require('./config/config');
const User = require('./models/user');

const userRoutes = require('./routes/user-routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({ defaultLayout: 'main' })); 
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    cookie: {
      maxAge: 3600000, 
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    }),
  }));
  
  app.get('/profile/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const username = user.username;

      const isPasswordValid = user.checkPassword('userEnteredPassword');
  
      res.status(200).json({ username, isPasswordValid });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.use('/users', userRoutes); 
app.use('/posts', postRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

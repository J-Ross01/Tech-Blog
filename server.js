require('dotenv').config();
const express = require('express');
const sequelize = require('./config/config');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helmet = require('helmet');
const { engine } = require('express-handlebars'); 

const userRoutes = require('./controllers/routes/userRoutes');
const postRoutes = require('./controllers/routes/postRoutes');
const commentRoutes = require('./controllers/routes/commentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000 
  },
}));

app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const postRoutes = require('./routes/post-routes');
const sequelize = require('./config/config');
const User = require('./models/user');
const userRoutes = require('./routes/user-routes');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 3600000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}));

app.get('/profile/:id', async (req, res) => {

});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

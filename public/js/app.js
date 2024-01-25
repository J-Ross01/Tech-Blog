const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/config'); 
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/user-routes'); 
const postRoutes = require('./routes/post-routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    store: new SequelizeStore({
        db: sequelize,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000, 
    },
}));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is now running at http://localhost:${PORT}`));
});

module.exports = app;

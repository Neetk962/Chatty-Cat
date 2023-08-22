const path =require('path');
const express = require('express');
const session = require("express-session");
const exphbs = require("express-handlebars");

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const port = process.env.PORT || 3001;

const sess = {
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
    cookie: {
        // set cookie age to 1 day until expiring
        maxAge: 24 * 60 * 60 * 1000
    }
};

app.use(session(sess));

// creating the handlebars engine
const hbs = exphbs.create({
    helpers,
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// the line below is middleware that lets express use the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log("Now listening"));
});
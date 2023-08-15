const path =require('path');
const express = require('express');
const routes = require('./controllers')

const sequelize = require('./config/connection');

const app = express();
const port = process.env.PORT || 3001;

const sess = {
    secret: "",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
    cookie: {
        maxAge: 60000
    }
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log("Now listening"));
});
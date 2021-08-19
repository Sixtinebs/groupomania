const express = require('express');
const sequelize = require('./config/db_sequelize');
const cors = require('cors');

const app = express();
const usersRoute = require('./routes/user');
const messagesRoute = require('./routes/message');
const commentsRoute = require('./routes/comment');
const path = require('path');

//.env
const dotenv = require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
  allowedHeaders: 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS'
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('OK !')
})

try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
  sequelize.query("SELECT * FROM users;").then(([results, metadata]) => {
    //console.log(results);
  })
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

// My Routes
app.use('/groupomania/auth', usersRoute);
app.use('/groupomania/message', messagesRoute);
app.use('/groupomania/comment', commentsRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;
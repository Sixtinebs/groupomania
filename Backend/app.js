const express = require('express');
//const db = require('./config/db');
const sequelize = require('./config/db_sequelize');

const app = express();
const usersRoute = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('OK !')
})

//Connect Data Base

/*
db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  db.query("SELECT * FROM users;", function (err, result) {
    if (err) throw err;
    console.log(result);
    db.end();
  });
});
 */
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

module.exports = app;
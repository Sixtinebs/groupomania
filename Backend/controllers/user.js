const User = require('../models/user');

exports.test = (req, res, next ) => {
    console.log(User);
        //recherche de tous les utilisateurs
        User.findAll().then(users => {
            //on récupère ici un tableau "users" contenant une liste d'utilisateurs
            console.log( 'Les utilisateurs ' + JSON.stringify(users));
            res.status(200).json({users: users});
        }).catch(function (e) {
            //gestion erreur
            console.log(e);
        });
}

// exports.login =( req, res, next) => {


// }

// exports.register = (req, res, next ) => {
    
// }
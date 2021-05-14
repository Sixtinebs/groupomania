const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.test = (req, res, next) => {

    //recherche de tous les utilisateurs
    User.findAll().then(users => {
        //on récupère ici un tableau "users" contenant une liste d'utilisateurs
        console.log('Les utilisateurs ' + JSON.stringify(users));
        res.status(200).json({ users: users });
    }).catch(function (e) {
        //gestion erreur
        console.log(e);
    });
}

exports.register = (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                isAdmin: req.body.isAdmin
            });
            user.save()
                .then(() => res.status(201).json({ message: 'user has been created ! ' }))
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(400).json({ error }));

}


exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log(3);
                        return res.status(401).json({ message: 'your authantifications are not valid ' })
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}
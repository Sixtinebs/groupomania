const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUser = (req, res, next) => {

    //recherche de tous les utilisateurs
    db.User.findAll({}).then(users => {
        //on récupère ici un tableau "users" contenant une liste d'utilisateurs
        res.status(200).json({ users: users });
    }).catch(function (e) {
        //gestion erreur
        console.log(e);
    });
}
exports.getOneUser = (req, res, next) => {
    db.User.findOne({ where: { id: req.query.userId } })
        .then(user => {
            res.status(200).json({ user: user })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.register = (req, res, next) => {
    const userInfo = req.body.userInfo;
    bcrypt.hash(userInfo.password, 10)
        .then(hash => {
            const user = new User({
                email: userInfo.email,
                password: hash,
                //isAdmin: userInfo.isAdmin,
                name: userInfo.name
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'user has been created ! ',
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN,
                        { expiresIn: '24h' }
                    )
                }))
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(400).json({ error }));

}


exports.login = (req, res, next) => {
    const userInfo = req.body.userInfo;

    db.User.findOne({ where: { email: userInfo.email } })
        .then(user => {
            bcrypt.compare(userInfo.password, user.password)
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
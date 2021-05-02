const User = require('../models/user');
const bcrypt = require('bcrypt');

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

// exports.login =( req, res, next) => {


// }
exports.register = (req, res, next) => {
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
    console.log(req.body.email)
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            console.log(user.email)
            if (user === null) {
                return res.status(401).json({ error: "Email don't exist " })
            }
            bcrypt.compare(user.password, req.body.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'your authantifications are not valid ' })
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}
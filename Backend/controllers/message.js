
const db = require('../models');
const jwt = require('jsonwebtoken');

exports.createMessage = (req, res, next) => {
    const message = req.body;
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN, function (err, decoded) {
        if (err) {
            err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
            }
        }
        if (!decoded) {
            console.log('invalid token')
            res.status(500).json({ err });
        } else {
            db.Message.create(message)
                .then(() => { res.status(201).json({ message: 'Message crée !' }) })
                .catch(error => { res.status(500).json({ error }) })
        }
    })


}

exports.getAllMessages = (req, res, next) => {
    db.Message.findAll(
        {
            include: [{
                model: db.User,
                attributes: ['id', 'name'],

            }, {
                model: db.Comment,
                as: 'Comments',
                attributes: ['id']

            }],
            order: [['id', 'DESC']],

        }

    ).then(msg => {
        //on récupère ici un tableau "users" contenant une liste d'utilisateurs
        res.status(200).json({ message: msg });
    }).catch(function (e) {
        //gestion erreur
        console.log(e);
    });
}
exports.getOneMessage = (req, res, next) => {
    db.Message.findOne({ where: { id: req.query.id } })
        .then(message => {
            res.status(200).json({ message: message })
        })
        .catch(error => res.status(404).json({ error }))
}
exports.modifyMessage = (req, res, next) => {
    const newMessage = req.body
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    db.Message.findOne({ where: { id: req.query.id } })
        .then(message => {
            if (message.user_id != userId) {
                console.log('Token invalid')
            } else {
                db.Message.update(newMessage, { where: { id: req.query.id } })
                    .then(() => {
                        res.status(200).json({ message: 'Message modifié' })
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(404).json({ error }))
}

exports.deleteMessage = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    db.Message.findOne({ where: { id: req.query.id } })
        .then(message => {
            if (message.user_id != userId) {
                console.log('Token invalid')
            } else {
                db.Message.destroy({ where: { id: req.query.id } })
                    .then(() => {
                        res.status(204).json({ message: 'Message supprimé ' })
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(404).json({ error }))

}
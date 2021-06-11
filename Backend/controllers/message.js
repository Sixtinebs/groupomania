
// const User = require('../models/user');
const db = require('../models');

exports.createMessage = (req, res, next) => {
    const message = req.body;
    db.Message.create(message)
        .then(() => { res.status(201).json({ message: 'Message crée !' }) })
        .catch(error => { res.status(500).json({ error }) })
}

exports.getAllMessages = (req, res, next) => {
    db.Message.findAll(
        {
            include: [{
                model: db.User,
                attributes: ['id', 'name'],

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
    const newMessage = { message: req.body.message }
    db.Message.update(newMessage, { where: { id: req.query.id } })
        .then(() => {
            res.status(200).json({ message: 'Message modifié' })
        })
        .catch(error => console.log(error))
}

exports.deleteMessage = (req, res, next) => {
    db.Message.destroy({ where: { id: req.query.id } })
        .then(() => {
            res.status(204).json({ message: 'Message supprimé ' })
        })
        .catch(error => res.status(404).json({ error }))
}

const db = require('../models');
const fs = require('fs');

exports.createMessage = (req, res, next) => {
    const infoMessage = req.body
    const userId = res.locals.user.userId
    const message = {
        ...infoMessage,
        user_id: userId,
        image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
    }
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
    db.Message.findOne({
        where: { id: req.query.id },
        include: [{
            model: db.Comment,
            attributes: ['id', 'comment'],
            include: [{
                model: db.User,
                attributes: ['id', 'name']
            }]
        }]
    })
        .then(message => {
            res.status(200).json({ message: message })
        })
        .catch(error => res.status(404).json({ error }))
}
exports.modifyMessage = (req, res, next) => {
    const userId = res.locals.user.userId
    const message = req.body
    const newMessage = {
        ...message,
        user_id: userId,
        image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
    }
    db.Message.findOne({ where: { id: req.query.id } })
        .then(message => {
            if (res.locals.user.userId === message.user_id || res.locals.user.isAdmin) {
                if (message.image) {
                    const image = message.image.split('/images/')[1];
                    fs.unlinkSync(`images/${image}`);
                }
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
    db.Message.findOne({ where: { id: req.query.id } })
        .then(message => {
            if (res.locals.user.userId === message.user_id || res.locals.user.isAdmin) {
                if (message.image) {
                    let image = message.image.split('/images/')[1];
                    fs.unlinkSync(`images/${image}`)
                };
                db.Message.destroy({ where: { id: req.query.id } })
                    .then(() => {

                        res.status(204).json({ message: 'Message supprimé ' })
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(404).json({ error }))
}
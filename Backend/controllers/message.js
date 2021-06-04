const Message = require('../models/message');
const User = require('../models/user');

exports.createMessage = (req, res, next) => {
    const message = req.body;
    Message.create(message)
        .then(() => { res.status(201).json({ message: 'Message crée !' }) })
        .catch(error => { res.status(500).json({ error }) })
}

exports.getAllMessages = (req, res, next) => {
    Message.findAll(
        {
            include: [{
                model: User,
                attributes: ['id', 'name']
            }]
        }
    ).then(msg => {
        //on récupère ici un tableau "users" contenant une liste d'utilisateurs
        res.status(200).json({ message: msg });
    }).catch(function (e) {
        //gestion erreur
        console.log(e);
    });
}

exports.modifyMessage = (res, req, next) => {

}

exports.deleteMessage = (res, req, next) => {

}
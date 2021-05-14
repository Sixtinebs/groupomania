const Message = require('../models/message');

exports.createMessage = (req, res, next) => {
    console.log('message', req.body);
    const message = req.body;
    Message.create(message)
        .then(() => { res.status(201).json({ message: 'Message crée !' }) })
        .catch(error => { res.status(500).json({ error }) })
}

exports.getAllMessages = (req, res, next) => {
    Message.findAll().then(msg => {
        //on récupère ici un tableau "users" contenant une liste d'utilisateurs
        console.log('Les Messages' + JSON.stringify(msg));
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
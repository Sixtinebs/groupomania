const db = require('../models');
const jwt = require('jsonwebtoken');

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll()
        .then(comment => {
            res.status(200).json({ comment: comment });
        }).catch(function (e) {
            console.log(e)
        })
}
exports.createComments = (req, res, next) => {
    console.log(req.body)
    const comment = req.body;
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN, function (err, decoded) {
        if (err) {
            console.log('Invalid token')
            err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
            }
        }
        if (decoded) {
            db.Comment.create(comment)
                .then(() => { res.status(201).json({ message: 'Comment write !' }) })
                .catch(error => res.status(500).json({ error }))
        } else {
            res.status(401).json({ err })
        }
    })
}

exports.modifyComments = (req, res, next) => {
    let commentModify = req.body;
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN, function (err, decoded) {
        if (err) {
            console.log('Invalid token')
            err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
            }
            res.status(401).json({ err })
        }
        if (decoded) {
            db.Comment.findOne({ where: { id: req.query.id } })
                .then(comment => {
                    console.log(comment)
                    db.Comment.update(commentModify, { where: { id: req.query.id } })
                        .then(() => res.status(200).json({ message: 'Comment has been modified' }))
                        .catch(error => res.status(500).json({ error }))
                })
                .catch(error => res.status(500).json({ error }))

        }
    })
}
exports.deleteComments = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN, function (err, decoded) {
        if (err) {
            console.log('Invalid token')
            err = {
                name: 'TokenExpiredError',
                message: 'jwt expired',
            }
            res.status(401).json({ err })
        }
        if (decoded) {
            db.Comment.destroy({ where: { id: req.query.id } })
                .then(() => {
                    res.status(204).json({ message: 'delete comment' })
                })
                .catch(error => res.status(500).json({ error }))

        }
    })
}

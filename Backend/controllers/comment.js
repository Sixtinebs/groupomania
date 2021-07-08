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
    const comment = req.body;
    db.Comment.create(comment)
        .then(() => { res.status(201).json({ message: 'Comment write !' }) })
        .catch(error => res.status(500).json({ error }))
}

exports.modifyComments = (req, res, next) => {
    let commentModify = req.body;
    db.Comment.findOne({ where: { id: req.query.id } })
        .then(comment => {
            if (res.locals.user.userId === comment.user_id || res.locals.user.isAdmin) {
                db.Comment.update(commentModify, { where: { id: req.query.id } })
                    .then(() => res.status(200).json({ message: 'Comment has been modified' }))
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
}
exports.deleteComments = (req, res, next) => {
    db.Comment.findOne({ where: { id: req.query.id } })
        .then(comment => {
            if (res.locals.user.userId === comment.user_id || res.locals.user.isAdmin) {
                db.Comment.destroy({ where: { id: req.query.id } })
                    .then(() => {
                        res.status(204).json({ message: 'delete comment' })
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))

}

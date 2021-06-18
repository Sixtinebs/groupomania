const db = require('../models');

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        include: [{
            model: db.User,
            attributes: ['id', 'name']
        }]
    }).then(comment => {
        res.status(200).json({ comment: comment });
    }).catch(function (e) {
        console.log(e)
    })
}
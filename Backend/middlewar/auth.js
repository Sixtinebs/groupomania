const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.TOKEN);

        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}
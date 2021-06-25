const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        decoded = jwt.verify(token, process.env.TOKEN);
        res.locals.user = decoded;
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}
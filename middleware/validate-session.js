const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    // console.log("+++++++++++++" + JSON.stringify(req.body) + "++++++++++++++++++++++++++YO THIS AINT WORKING++++++++++++++++++++++++")
    const token = req.headers.authorization;

    console.log(token)

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (!err && decoded) {
            User.findOne({
                where: {
                    id: decoded.id
                }
            }, console.log(decoded))
                .then(user => {
                    if (!user) throw 'err';
                    req.user = user;

                    return next();
                })
                .catch(err => next(err));
        } else {
            req.errors = err;
            return res.status(500).send('Not authorized');
        }
    })
}

module.exports = validateSession;
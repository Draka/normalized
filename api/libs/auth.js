const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    req.isAuthenticated = () => {
        let token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || _.get(req, 'cookies.token');
        try {
            return jwt.verify(token, config.key_secret);
        } catch (err) {
            return false;
        }
    };

    if (req.isAuthenticated()) {
        let payload = req.isAuthenticated();
        req.user = payload;
        res.locals.session = payload;
        next();
    } else {
        next();
    }
};
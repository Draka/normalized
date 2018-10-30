const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

function comparePassword(password, field, cb) {
    bcrypt.compare(password, field, function (err, isMatch) {
        cb(err, isMatch);
    });
}

function generateToken(user, secret, device_id) {
    var payload = {
        iss: 'localhost',
        _id: user._id,
        device_id: device_id,
        iat: moment().unix(),
        exp: moment().add(1, 'years').unix()
    };
    return jwt.sign(payload, secret);
}


module.exports = (req, res, next) => {
    req.body.device_id = 'normalized';
    models.User.
    findOne({
        email: req.body.email,
        admin: true
    }).
    select({
        password: 1,
        password_temp: 1
    }).
    lean().
    exec((err, doc) => {
        if (err || !doc) {
            return listErrors(401, res);
        } else {
            async.parallel({
                normal: (cb) => {
                    comparePassword(req.body.password, doc.password, cb);
                },
                temp: (cb) => {
                    comparePassword(req.body.password, doc.password_temp, cb);
                }
            }, (err, results) => {
                if (!results.normal && !results.temp) {
                    return listErrors(401, res);
                }
                let token = generateToken(doc, config.key_secret, req.body.device_id);

                models.FCM.
                findOneAndUpdate({
                    user_id: doc._id,
                    device_id: req.body.device_id
                }, {
                    user_id: doc._id,
                    device_id: req.body.device_id
                }, {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }).
                exec((err, doc) => {
                    if (err) {
                        return next(err);
                    }
                    res.send({
                        token: token,
                        user: doc
                    });
                });
            });
        }
    });
};
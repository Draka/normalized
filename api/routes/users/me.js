module.exports = (req, res, next) => {
    models.User.
    findById(req.user._id).
    select({
        email: 1,
        personal_info: 1
    }).
    exec((err, doc) => {
        if (err || !doc) {
            return listErrors(401, res);
        } else {
            res.send(doc);
        }
    });
};
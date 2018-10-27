module.exports = (req, res, next) => {
    models.Trip.
    find().
    limit(10).
    sort({
        createdAt: -1
    }).
    select({
        alliance_id: 1
    }).
    exec((err, docs) => {

        res.send(docs);
    });
};
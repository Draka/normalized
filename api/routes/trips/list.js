module.exports = (req, res, next) => {
    models.Trip.
    find({
        status: {
            $in: ['finished', 'started']
        }
    }).
    limit(10).
    sort({
        createdAt: -1
    }).
    select('alliance_id id start end category type_service_id type_trip status price').
    exec((err, docs) => {

        res.send(docs);
    });
};
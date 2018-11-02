module.exports = (req, res, next) => {
    models.Trip.
    find({
        $or: [{
                status: {
                    $in: ['finished', 'started']
                }
            },
            {
                status: 'normalized',
                // 'end.finished_date': {
                //     $gte: moment().subtract(100, 'minutes')
                // }
            }
        ]
    }).
    limit(100).
    sort({
        'end.date': -1
    }).
    select('alliance_id id start end category type_service_id type_trip status price').
    exec((err, docs) => {

        res.send(docs);
    });
};
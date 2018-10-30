const Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    driver_id: {
        type: Schema.Types.ObjectId,
        ref: `${config.db_prefix}drivers`,
        index: true
    },
    alliance_father_id: {
        type: Schema.Types.ObjectId,
        ref: `${config.db_prefix}alliances`,
        index: true
    },
    passenger_id: {
        type: Schema.Types.ObjectId,
        ref: `${config.db_prefix}users`,
        index: true
    },
    guest: {
        name: {
            type: String,
            index: true
        },
        phone: {
            type: String,
            index: true
        },
        email: {
            type: String,
            index: true
        }
    },
    type_trip: {
        type: String,
        index: true
    },
    status: {
        type: String,
        index: true
    },
    price: {},
    start: {},
    end: {},
    statuses: {
        status: {
            type: String,
            index: true
        },
        date: Date,
        path: String,
        location: {
            type: String,
            coordinates: []
        },
        radio: Number,
        driver_id: {
            type: Schema.Types.ObjectId,
            ref: `${config.db_prefix}drivers`,
            index: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: `${config.db_prefix}users`,
            index: true
        }
    },
    statistics: {
        distance: Number,
        time: Number
    },
    arrived: {},
    finished: {}
});

module.exports = mongoose.model(`${config.db_prefix}trips`, schema);
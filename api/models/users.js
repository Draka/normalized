const bcrypt = require('bcrypt-nodejs');

function hash(obj, key, cb) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return cb(err);
        }
        bcrypt.hash(obj[key], salt, null, (err, hash) => {
            if (err) {
                return cb(err);
            }
            obj[key] = hash;
            cb();
        });
    });
}

function pre_update(result, next) {
    if (_.get(result, 'personal_info.firstname') && _.get(result, 'personal_info.lastname')) {
        result.personal_info.name = `${result.personal_info.firstname} ${result.personal_info.lastname}`;
    }
    async.map(['password', 'password_temp'], (field, cb) => {
        if (result[field]) {
            hash(result, field, cb);
        } else {
            cb();
        }
    }, next);
}

let schema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        index: {
            unique: true,
            sparse: true
        }
    },
    password: {
        type: String,
        trim: true
    },
    password_temp: {
        type: String,
        trim: true
    },
    admin: Boolean
});

schema.post('validate', pre_update);
const User = mongoose.model(`${config.db_prefix}users`, schema);

module.exports = User;
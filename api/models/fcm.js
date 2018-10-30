const Schema = mongoose.Schema;

let schema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: `${config.db_prefix}users`,
        index: true,
        required: true
    },
    device_id: String
});


module.exports = mongoose.model(`${config.db_prefix}fcms`, schema);
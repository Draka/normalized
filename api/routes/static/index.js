module.exports = (app) => {
    app.get(`/trips`, require('./list'));
};
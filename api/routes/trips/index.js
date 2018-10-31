module.exports = (app) => {
    app.get(`/trips`, checkAuth, require('./list'));
};
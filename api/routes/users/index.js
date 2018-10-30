module.exports = (app) => {
    app.post(`/users/login`, require('./login'));
    app.get(`/users/me`, checkAuth, require('./me'));
};
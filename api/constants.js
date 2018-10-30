global.async = require('async');
global._ = require('lodash');
global.mongoose = require('mongoose');
global.moment = require('moment-timezone');
global.listErrors = require('./libs/errors');
global.checkAuth = require('./libs/check_auth');

let vars = {
    _tz: 'America/Bogota'
};
_.forEach(vars, (v, i) => {
    global[i] = v;
});
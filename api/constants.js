global._ = require('lodash');
global.mongoose = require('mongoose');

let vars = {
    _tz: 'America/Bogota'
};
_.forEach(vars, (v, i) => {
    global[i] = v;
});
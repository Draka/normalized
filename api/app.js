require('./constants');
global.config = require('./config');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const compression = require('compression');

// Base de datos
mongoose.Promise = require('bluebird');
let dbOptions = {
    auto_reconnect: true,
    promiseLibrary: global.Promise,
    useCreateIndex: true,
    useNewUrlParser: true
};
mongoose.connect('mongodb://34.206.72.155/modules', dbOptions).then(
    () => {
        console.log('MongoDB open Miaguila');
    },
    err => {
        console.log('MongoDB open Miaguila', err);
        process.exit(1);
    }
);
global.models = require('./models');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(require('./libs/crossdomain'));

//Idioma
app.use(express.static(path.join(__dirname, 'public')));

//carga de módulos

// app.use('/', function (req, res) {
//     res.send({
//         ok: true
//     });
// });
require('./routes')(app);

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).send(err.message);
});


module.exports = app;
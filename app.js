var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var fs = require('fs');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';

// const methodOverride = require('method-override');

var app = express();
// app.use(methodOverride('_method'));
// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'webapps')));

fs
    .readdirSync(path.join(__dirname, 'routes'))
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var base = '/' + file.slice(0, -3)
        var router = require('./routes' + base);
        if (base === '/index') base = '/'
        app.use(base, router);
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

module.exports = app;

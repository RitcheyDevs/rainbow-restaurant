const express = require('express');
const engine = require('ejs-locals');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const assetPath = require('./helpers/asset-path');
const config = require('config');

const index = require('./routes/index');
const login = require('./routes/login');
const register = require('./routes/register');
const cart = require('./routes/cart');
const system = require('./routes/system');


let app = express();

app.use(assetPath({
  prefix: config.cdn.prefix,
  manifest: config.cdn.manifestFile
}))

// view engine setup
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',  // 加強私密安全
  resave: true,    // 每次呼叫要不要寫入node.js (建議改成true)
  saveUninitialized: true
}));

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

app.use('/', index);
app.use('/index', index);
app.use('/login', login);
app.use('/register', register);
app.use('/cart', cart);
app.use('/system', system);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

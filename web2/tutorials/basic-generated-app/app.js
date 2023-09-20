var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pizzasRouter = require('./routes/pizzas');
var filmsRouter = require('./routes/films')

var app = express();

var port = 678;
app.listen(port, () => {
    console.log(`Le serveur est en cours d'écoute sur le port ${port}`);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pizzas', pizzasRouter);
app.use('/films', filmsRouter);

module.exports = app;

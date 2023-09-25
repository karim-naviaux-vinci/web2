var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var getCounter = 0;
var getPizzaCounter = 0;
var postPizzaCounter = 0;
var deleteCounter = 0;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pizzasRouter = require('./routes/pizzas');
var filmsRouter = require('./routes/films')

var app = express();

app.use((req, res, next) => {

  if(req.method == 'GET' && req.path == '/'){
    getCounter++;
  }
  if(req.method == 'GET' && req.path == '/pizzas'){
    getPizzaCounter++;
  }
  if(req.method == 'POST' && req.path == '/pizzas'){
    postPizzaCounter++;
  }
  if(req.method == 'DELETE' && req.path == '/pizzas'){
    deleteCounter++;
  }

  console.log('request counter : ' + '\n' + 
              '- GET / : ' + getCounter + '\n' + 
              '- GET /pizzas : ' + getPizzaCounter + '\n' + 
              '- POST /pizzas : ' + postPizzaCounter + '\n' + 
              '- DELETE /pizzas : ' + deleteCounter);

  next();
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

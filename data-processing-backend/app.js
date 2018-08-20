
var express = require('express');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use('/', indexRouter);

app.use('/public/', express.static('files'));

console.log('app listening at port 3000')
app.listen(3000);


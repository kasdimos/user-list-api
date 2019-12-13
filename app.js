
const express = require('express');
//const path = require('path');
const compression = require('compression');

const bodyParser = require('body-parser');

//Init App
const app = express();
app.disable('x-powered-by');

//Bodyparser middleware
app.use(bodyParser.json({ limit: '5kb' }));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.text({ limit: '5kb', type: 'text/plain' }));


app.use(compression());
// //Set Public Folder
// app.use(express.static(path.join(__dirname, 'public')));

// //View engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use('/', require('./routes'));
app.use('/', require('./routes/routeErrorHandling.js'));

module.exports = app;

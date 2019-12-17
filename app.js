
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

//Init App
const app = express();
app.disable('x-powered-by');

app.use(bodyParser.json({ limit: '5kb' }));

app.use(compression());

app.use('/', require('./routes'));
require('./routes/routeErrorHandling.js')(app);

module.exports = app;

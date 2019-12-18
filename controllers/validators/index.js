
let validators = {};

validators.email = require('./email.js');
validators.name = require('./name.js');
validators.role = require('./role.js');
validators.page = require('./page.js');
validators.limit = require('./limit.js');
validators.sortby = require('./sortby.js');
validators.filter = require('./filter.js');

module.exports = validators;

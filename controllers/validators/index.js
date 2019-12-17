
let validators = {};

validators.email = require('./email.js');
validators.name = require('./name.js');
validators.role = require('./role.js');
validators.page = require('./page.js');
validators.limit = require('./limit.js');
validators.searchby = require('./searchby.js');

module.exports = validators;

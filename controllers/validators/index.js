
let validators = {};

validators.email = require('./email.js');
validators.name = require('./name.js');
validators.role = require('./role.js');

module.exports = validators;

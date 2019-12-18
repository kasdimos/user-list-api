
const check = require('../ezValidator/check');
const sorts = ['name', 'email', 'role', 'signup', 'lastLogin', 'status'];

module.exports = check('sortby')
  .optional({nullable: true})
  .isString()
  .not().isEmpty()
  .custom(val => sorts.indexOf(val) >= 0)
  .withMessage('Invalid search term.');
  

const check = require('../ezValidator/check');

module.exports = check('searchby')
  .optional({nullable: true})
  .isString()
  .not().isEmpty()
  .custom(val => (val === 'name' || val === 'email') ? true : false)
  .withMessage('Invalid search term.');
  
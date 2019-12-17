
const check = require('../ezValidator/check');
const xss = require('../xss.js');

module.exports = check('role')
  .isString()
  .not().isEmpty().withMessage('Must not be empty')
  .trim()
  
  .isLength({ min: 3 }).withMessage('Must be at least 3 characters long.')
  .isLength({ max: 15 }).withMessage('Must be no more than 15 characters long.')

  .custom((val) => xss.safe(val))

  .withMessage(({req, field}) => 
    ({
      key: field.key,
      msg: req.messages[field.key],
      acceptableError: true
    })
  )
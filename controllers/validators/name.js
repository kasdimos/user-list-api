
const check = require('../ezValidator/check');
const xss = require('../xss.js');

module.exports = check('name')
  .isString()
  .not().isEmpty().withMessage('Must not be empty')
  .trim()
  
  .isLength({ min: 5 })
  .withMessage('Must be at least 5 characters long.')

  .isLength({ max: 50 })
  .withMessage('Must be no more than 50 characters long.')

  .custom((val) => xss.safe(val))

  .withMessage(({req, field}) => 
    ({
      key: field.key,
      msg: req.messages[field.key],
      acceptableError: true
    })
  )
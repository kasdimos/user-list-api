
const check = require('../ezValidator/check');
const xss = require('../xss.js');

module.exports = check('email')
  .isString()
  .not().isEmpty().withMessage('Must not be empty')
  .trim()
  .normalizeEmail({all_lowercase: false, gmail_lowercase: false})

  .isEmail().withMessage('Invalid email')


  .custom((val) => xss.safe(val))

  .withMessage(({req, field}) => 
    ({
      key: field.key,
      msg: req.messages[field.key],
      acceptableError: true
    })
  )

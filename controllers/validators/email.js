
const check = require('../ezValidator/check');
const xss = require('../xss.js');

module.exports = check('email')
  .isString()
  .not().isEmpty()
  .trim()
  .normalizeEmail({all_lowercase: false, gmail_lowercase: false})

  .isEmail()

  .custom((val) => xss.safe(val))

  .withMessage(({req, field}) => 
    ({
      key: field.key,
      msg: req.messages[field.key],
      acceptableError: true
    })
  )

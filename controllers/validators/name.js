
const check = require('../ezValidator/check');
const xss = require('../xss.js');

module.exports = check('name')
  .isString()
  .not().isEmpty()
  .trim()
  
  .isLength({ min: 5, max: 50 })

  .custom((val) => xss.safe(val))

  .withMessage(({req, field}) => 
    ({
      key: field.key,
      msg: req.messages[field.key],
      acceptableError: true
    })
  )
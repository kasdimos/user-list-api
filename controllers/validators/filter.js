
const check = require('../ezValidator/check');

module.exports = check('filter')
  .optional({nullable: true})
  .isString()
  .not().isEmpty().withMessage('Must not be empty')
  
  .isLength({ max: 50 })
  .withMessage('Must be no more than 50 characters long.')

  .custom((val, {req, key}) => {
    req.data[key] = String(val).replace(/([.*+?=^!:${}()|[\]\/\\])/g, '\\$1');
                              //.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, "\\$&");
    return true;
  })

  .withMessage(({req, field}) => 
    ({
      key: field.key,
      msg: req.messages[field.key],
      acceptableError: true
    })
  )

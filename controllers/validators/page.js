
const check = require('../ezValidator/check');

module.exports = check('page')
  .optional({nullable: true})
  .isString()
  .not().isEmpty()

  .custom((val, {req, key}) => {
    if(val.length <= 4 && /^\d+$/.test(val) && val.charAt(0) !== '0'){ //max-> 9999
      req.data[key] = parseInt(val);
      return true;
    }
    return false;
  })
  .withMessage('Invalid page number.');
  
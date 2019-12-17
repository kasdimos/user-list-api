
const check = require('../ezValidator/check');

module.exports = check('limit')
  .optional({nullable: true})
  .isString()
  .not().isEmpty()

  .custom((val, {req, key}) => {
    if(val.length <= 3 && /^\d+$/.test(val) && val.charAt(0) !== '0'){ //max-> 999
      req.data[key] = parseInt(val);
      return true;
    }
    return false;
  })
  .withMessage('Invalid limit number.');
  
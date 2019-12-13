const toString = require('../utils/to-string.js');
const selectFields = require('../utils/select-fields.js');

module.exports = (req, context) => {

  const validationErrors = [];
   
  //Get all fields from data (selectFields)
  let field = selectFields(req.data, context)

  if (field === null) return Promise.resolve();

  const { key, value } = field;

  //Create the promise chain (all validators) for this field
  let promiseChain = context.validators.reduce((promise, validatorCfg) => promise.then(() => {
    
      //For every validator,
      //get the result of the validation
      //It may be a promise
      const result = validatorCfg.custom ?
        validatorCfg.validator(value, { req, key }) :
        validatorCfg.validator(toString(value), ...validatorCfg.options);
      
      
      //Return promise for chain
      return Promise.resolve(result) //Create a promise for the validator promise / result
              .then(result => {
                
                //After the resolution, check for the result.
                if(result !== true && result !== false){
                  let e = new Error('The check did not specify result.');
                  e.promiseResult = result;
                  return Promise.reject(e);
                }

                //check for negation and if not successful result, reject
                if ((!validatorCfg.negated && !result) || (validatorCfg.negated && result)){
                  
                  if (typeof validatorCfg.message === 'function'){
                    validationErrors.push(validatorCfg.message({req, field}));
                  }else{
                    validationErrors.push({
                      key,
                      msg: getDynamicMessage(
                            [
                              validatorCfg.message,
                              context.message,
                              'Invalid value'
                            ],
                            field,
                            req
                          )
                    });
                  }

                  return (validatorCfg.continue) ? Promise.resolve() : Promise.reject();
                }
              });

    }),

    //Accumulator promise (First promise for validation chain in reduce)
    Promise.resolve()
  );
  
  return promiseChain
          .then(() => validationErrors)
          .catch(err=> err ? Promise.reject(err) : validationErrors);
};

function getDynamicMessage(messageSources, field, req) {
  const message = messageSources.find(message => !!message);
  return message;
}
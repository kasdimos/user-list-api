let i = 0;

module.exports.validate = (data, validators, runInSerial = false, cb) => {
  if(typeof runInSerial === 'function'){
    cb = runInSerial;
    runInSerial = false;
  }
  
  let req = {data};
  
  if(data === null || typeof data !== 'object' || Array.isArray(data)){
    req.dataError = new Error('Data is not an object.');
    req.dataError.theData = data;
    return retRes(Promise.resolve(req), cb);
  }

  for(i = 0; i<validators.length; i++){
    if(!validators[i] || typeof validators[i]._context !== 'object') throw new Error('Validator ' + i + ' not initialized');
  }

  //For optional fields null must be set (not undefined)
  if(Object.keys(data).length !== validators.length){
    req.dataError = new Error('Data has not same number of fields.');
    req.dataError.theData = data;
    req.dataError.theValidators = getValidatorNames(validators);
    return retRes(Promise.resolve(req), cb);
  }

  for(i = 0; i<validators.length; i++){
    if(typeof data[validators[i]._context.field] === 'undefined'){
      req.dataError = new Error('Data has not the same fields as the validators.');
      req.dataError.theData = data;
      req.dataError.theValidators = getValidatorNames(validators);
      return retRes(Promise.resolve(req), cb);
    }
  }
  
  i = 0;

  if(runInSerial){
    return retRes(new Promise(function(resolve, reject){
      function callValidator(){
        if(i > validators.length-1){
          return resolve(req);
        }

        validators[i](req)
          .then(()=>{ callValidator(); })
          .catch(err => { reject(err); });

        i++;
      }
      callValidator();
    })
    ,
    cb);

  }else{
    let promises = [];
    for(; i<validators.length; i++) promises.push(validators[i](req));

    return retRes(Promise.all(promises)
      .then(() => {
        return req;
      })
    ,
    cb);
  }

};

function getValidatorNames(validators){
  return validators.map(validator => validator._context.field);
}

module.exports.getValidatorNames = getValidatorNames;

function retRes(promise, cb){
  if (cb && typeof cb == 'function'){
    promise
      .then(res => cb(null, res))
      .catch(cb);
  }
  return promise;
}

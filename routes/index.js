
const Router = require('express-promise-router');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();


let { validate } = require('../controllers/ezValidator');
let validators = require('../controllers/validators');


router.post('/newUser', async function(req, res, next){

  
  await validate(req.body, [ validators.name, validators.email, validators.role ])
  .then(async valRes => {
    
    if(valRes.dataError){
      console.log(valRes.dataError.message);
      return res.json(valRes.dataError);
    }
    
    if (valRes.validationErrors && valRes.validationErrors.length){
      console.log(valRes.validationErrors);

      return res.json(valRes.validationErrors);
    }
    

  });


  //res.json(req.body);
});

router.get('/users', function(req, res, next){

  res.json([
    {
      signup: new Date(),
      lastLogin: new Date(),
      name: 'John', email: 'john@gmail.com', role: 'admin', status: 'active'
      //birthCity: 63 
    },
    {
      signup: new Date(),
      lastLogin: new Date(),
      name: 'Helen', email: 'helen@gmail.com', role: 'user', status: 'inactive'
      //birthCity: 63 
    },
    {
      signup: new Date(),
      lastLogin: new Date(),
      name: 'Kathy', email: 'helen@gmail.com', role: 'user', status: 'inactive'
      //birthCity: 63 
    }
  ]);


});

module.exports = router;

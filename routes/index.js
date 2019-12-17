
const Router = require('express-promise-router');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();


let { validate } = require('../controllers/ezValidator');
let validators = require('../controllers/validators');

const colUsers = global.utils.dbmg.db('api').collection('users');


router.post('/newUser', async function(req, res, next){

  let valRes = await validate(req.body, [ validators.name, validators.email, validators.role ]);

  if(valRes.dataError){
    console.log(valRes.dataError.message);
    return res.json('Validation errors occured');
  }
  if (valRes.validationErrors && valRes.validationErrors.length){
    console.log(valRes.validationErrors);
    return res.json(valRes.validationErrors);
  }
  
  req.body.signup = new Date();
  req.body.lastLogin = null;
  req.body.status = 'active';

  try{
    await colUsers.insertOne(req.body);
  }catch(err){
    if(err.code === 11000) return res.json([{key:'email', msg:'Email already exists'}]);
    throw err;
  }
  
  console.log('Inserted user');
  res.json({success: true});
});

router.get('/users', async function(req, res, next){
  
  console.log(req.query)
  if(req.query.page === undefined) req.query.page = null;
  if(req.query.limit === undefined) req.query.limit = null;
  if(req.query.searchby === undefined) req.query.searchby = null;

  let valRes = await validate(req.query, [ validators.page, validators.limit, validators.searchby]);
  if(valRes.dataError){
    console.log(valRes.dataError.message);
    return res.json('Validation errors occured');
  }
  if (valRes.validationErrors && valRes.validationErrors.length){
    console.log(valRes.validationErrors);
    return res.json(valRes.validationErrors);
  }

  res.json(
    await colUsers.find({})
    .toArray()
  );

});


module.exports = router;

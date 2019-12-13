
const Router = require('express-promise-router');
const router = new Router();
const getClientIp = require('../controllers/getIp.js');

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.sendStatus(err.status);
});

// error handler
router.use(async function(err, req, res, next){
  err.extraReqInfo = {
    ip: getClientIp(req),
    method: req.method,
    reqUrl: req.originalUrl,
    reqBody: (req.method === 'GET') ? undefined : req.body
  };
  
  if(typeof err.status !== 'number') err.status = 500;

  console.log(err);

  res.sendStatus(err.status);
});

module.exports = router;
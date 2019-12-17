

const getClientIp = require('../controllers/getIp.js');

module.exports = function(app){
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(async function(err, req, res, next){
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
}


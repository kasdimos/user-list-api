var http = require('http');

module.exports = function(connectionListener, port, ip){
  return new Promise(function(resolve, reject){
    try{

      port = normalizePort(port);
      connectionListener.set('port', port);

      /**
       * Create HTTP server.
       */
      var server = http.createServer(connectionListener);

      server.on('error', onError);
      server.on('listening', onListening);

      /**
       * Listen on provided port, on all network interfaces.
       */
      server.listen(port, ip);


      /**
       * Event listener for HTTP server "error" event.
       */
      function onError(error) {
        if (error.syscall !== 'listen') {
          throw error;
        }

        var bind = typeof port === 'string'
          ? 'Pipe ' + port
          : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
          case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            break;
          case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            break;
          case 'EADDRNOTAVAIL':
            console.error('IP ' + ip +' is not available');
            break;
        }

        reject(error);
      }

      /**
       * Event listener for HTTP server "listening" event.
       */
      function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
        console.log('Listening on ' + bind);
        resolve(server);
      }

    }catch(e){
      reject(e);
    }
  });




};

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = function(req) {
  let ipAddress = req.connection.remoteAddress;
  
  if(!ipAddress) return '';
  
  // convert from "::ffff:192.0.0.1"  to "192.0.0.1"
  if (ipAddress.substr(0, 7) == "::ffff:") ipAddress = ipAddress.substr(7);
  
  return ipAddress;
};

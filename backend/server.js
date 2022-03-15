const https = require('https');
const app = require ('./app');
const fs = require("fs");
const path = require("path");

const certfile = fs.readFileSync(path.join(__dirname, "cert", "cert.pem"));
const keyfile = fs.readFileSync(path.join(__dirname, "cert", "key.pem"));

const secureserver = https.createServer({ cert: certfile, key: keyfile, passphrase: "come0801" }, app);

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


secureserver.on('error', errorHandler);
secureserver.on('listening', () => {
  const address = secureserver.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

secureserver.listen(port);

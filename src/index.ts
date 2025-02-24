import { HttpError } from 'http-errors';
import * as http from 'http';

import app from "./app";

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
        return val;
    }
  
    if (port >= 0) {
      return port;
    }
  
    return false;
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr?.port;
    console.log('Listening on ' + bind);
}

function onError(error: HttpError) {
    if (error.syscall !== 'listen') {
        throw error;
    }
  
    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;
  
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
  
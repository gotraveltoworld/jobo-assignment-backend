#!/usr/bin/env node
/* eslint-disable require-jsdoc */

import {createServer} from 'http';
import {createTerminus} from '@godaddy/terminus';

import app from './app.js';
import createLogger from '#logger';
import {closeDB, initializeDB} from '#utils/dbConn.js';

const logger = createLogger('server');

const PORT = parseInt(process.env.PORT, 10);
app.set('port', PORT);
const SERVER = createServer(app);

const TERMINATE_TIMEOUT = 120 * 1000; // 120 seconds
const BEFORE_SHUTDOWN_SECONDS = 32 * 1000; // 32 seconds.

async function start(httpServer, port) {
  initializeDB();

  // Graceful shutdown.
  createTerminus(httpServer, {
    onSignal: () => Promise.all([closeDB()]),
    beforeShutdown: () => new Promise((resolve) => {
      setTimeout(resolve, BEFORE_SHUTDOWN_SECONDS);
    }),
    timeout: TERMINATE_TIMEOUT,
    // Refer to: https://github.com/godaddy/terminus#how-to-set-terminus-up-with-kubernetes
    useExit0: true,
  });

  httpServer.listen(port);
  httpServer.on('error', onError);
  httpServer.on('listening', onListening);
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;

  const errorCodes = {
    'EACCES': () => {
      logger.error(`${bind} requires elevated privileges`);
    },
    'EADDRINUSE': () => {
      logger.error(`${bind} is already in use`);
    },
  };

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  if (!errorCodes?.[error.code]) throw error;
  errorCodes[error.code]();
  process.exit(1);
}

function onListening() {
  const addr = SERVER.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);
}

start(SERVER, PORT);

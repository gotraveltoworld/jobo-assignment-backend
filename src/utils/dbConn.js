/* eslint-disable require-jsdoc */
import config from 'config';
import knex from 'knex';

import createLogger from '#logger';
const logger = createLogger('db');

const SCHEMA = 'jubo';
const DB_CONFIG = config.get('database');
const ACQUIRE_CONNECTION_TIMEOUT = 10000;

const initInstance = () => {
  const {host, port, user, password, name: database, ssl} = DB_CONFIG;
  return knex({
    client: 'pg',
    connection: {
      host,
      port,
      user,
      database,
      password,
      ssl: ssl ? {rejectUnauthorized: false} : false,
    },
    pool: {
      min: 1,
      max: 7,
      afterCreate: (conn, done) => {
        // in this example we use pg driver's connection API
        conn.query(`SET search_path TO my_schema, ${SCHEMA};`, (err) => {
          if (err) {
            // first query failed,
            // return error and don't try to make next query
            done(err, conn);
          } else {
            // do the second query...
            conn.query(
                'SELECT 1',
                (err) => {
                  // if err is not falsy,
                  //  connection is discarded from pool
                  // if connection aquire was triggered by a
                  // query the error is passed to query promise
                  done(err, conn);
                });
          }
        });
      },
    },
    acquireConnectionTimeout: ACQUIRE_CONNECTION_TIMEOUT,
  });
};

export default class DatabaseSingleton {
  constructor() {
    throw new Error('Use Singleton.getInstance()');
  }

  static instance = null;

  static getInstance = () => {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = initInstance();
      logger.info('DB instance is created.');
    }
    return DatabaseSingleton.instance;
  };
};

export const initializeDB = () => DatabaseSingleton.getInstance();
export const closeDB = () => DatabaseSingleton.getInstance().destroy();

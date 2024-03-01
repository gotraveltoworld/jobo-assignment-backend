import dbConn from '#utils/dbConn.js';

export const getConn = (dbClient = null) => dbClient ? dbClient : dbConn.getInstance();

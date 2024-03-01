module.exports = {
  logger: {
    level: process.env.LOGGER_LEVEL || 'debug',
  },
  database: {
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PWD || 'password',
    name: process.env.DB_NAME || 'jubo',
    ssl: process.env.DB_SSL === 'true' ? true : false,
  },
};

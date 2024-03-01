import config from 'config';
import {createLogger, format, transports} from 'winston';

const formatter = (module) =>
  format.printf((info) =>
    `[${new Date().toISOString()}] (${info.level}) (${module}) ${info.message}`);

const getLogger = (formatter) => (module) =>
  createLogger({
    level: config.logger.level,
    format: format.combine(format.metadata(), formatter(module)),
    transports: [new transports.Console()],
  });

export default getLogger(formatter);

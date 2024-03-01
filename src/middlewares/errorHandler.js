import {HTTP_STATUS_CODE} from '#constants/index.js';
import * as errors from '#errors';
import createLogger from '#logger';
import {makeHttpResponse} from '#utils/index.js';
export const DEFAULT_ERROR_MSG = 'Something went wrong';

const logger = createLogger('errorHandler');

const catchSyntaxErrorByInvalidJson = (err, req) => {
  const badRequestStatus = HTTP_STATUS_CODE.BAD_REQUEST;
  if (
    err instanceof SyntaxError &&
        err.status === badRequestStatus &&
        'body' in err &&
        err.type === 'entity.parse.failed'
  ) {
    const data = req.body || req.query;

    try {
      JSON.parse(data); // reproduce error in order to catch it
    } catch (error) {
      return new errors.InvalidJsonSyntaxError(badRequestStatus, error.message);
    }
  }
};

export default (err, req, res, _next) => {
  const defaultStatusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

  const jsonSyntaxError = catchSyntaxErrorByInvalidJson(err, req);

  const defaultErrorObj = {code: defaultStatusCode, message: DEFAULT_ERROR_MSG};

  const isValidErrorObj = err instanceof errors.BaseError;

  const errorObj = isValidErrorObj ?
        {
          message: err.message || jsonSyntaxError?.message || DEFAULT_ERROR_MSG,
        } :
        defaultErrorObj;

  const formattedResponse = makeHttpResponse(errorObj);

  const status = err.status;
  if (status) logger.warn(`Status(${status})`, err);
  else logger.error(DEFAULT_ERROR_MSG, err);

  res.status(status || defaultStatusCode).send(formattedResponse);
};

import isUndefined from 'lodash-es/isUndefined.js';
import omitBy from 'lodash-es/omitBy.js';

export const makeHttpResponse =
    ({code, message, requestId = undefined, data = undefined}) =>
      omitBy({code, message, requestId, data}, isUndefined);

export const wrapHandlerWithErrorCatcher =
    (handler) => (req, res, next) => handler(req, res, next).catch(next);

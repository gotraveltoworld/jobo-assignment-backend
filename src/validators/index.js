import {InvalidParameterError} from '#errors';

export const validRequest = (schema, data, customizedOptions = {}) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
    ...customizedOptions,
  };
  const {error, value} = schema.validate(data, options);

  if (error) throw new InvalidParameterError(error?.message);
  return value;
};

export const validRequestForReq = (schema) => (req, _res, next) => {
  const bodyValue = schema.body ? validRequest(schema.body, req.body) : req.body;
  const paramsValue = schema.params ? validRequest(schema.params, req.params): req.params;
  const queryValue = schema.query ? validRequest(schema.query, req.query): req.query;

  // Validate and overwrite req's data by a valid data.
  if (bodyValue) req.body = bodyValue;
  if (paramsValue) req.params = paramsValue;
  if (queryValue) req.query = queryValue;
  next();
};

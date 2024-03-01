import {jest} from '@jest/globals';

// Mock Express Request So req.body can be called.
export const mockRequest = ({body, headers, params, query} = {}, otherParams = {}) => ({
  body,
  headers,
  params,
  query,
  ...otherParams,
  get: (key) => headers[key],
});

// Mock Express Response, support status, send, and json.
export const mockResponse = (locals = {}) => ({
  status: jest.fn(),
  json: jest.fn((value) => value),
  send: jest.fn((value) => value),
  success: jest.fn((value) => value), // Support our customized success handler.
  locals: {
    ...locals,
  },
});

export const mockNext = () => jest.fn();

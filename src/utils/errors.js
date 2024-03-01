/* eslint-disable require-jsdoc */
import {HTTP_STATUS_CODE} from '#constants/index.js';

export class InvalidJsonSyntaxError extends SyntaxError {
  constructor(status, message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.invalid = true;
    this.status = status;
    this.name = 'INVALID_JSON_DATA';
    this.message = `Invalid JSON data: ${message}`;
  }
}

export class BaseError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS_CODE.FORBIDDEN;
    this.name = 'FORBIDDEN';
    this.message = message;
  }
}

export class InvalidParameterError extends BaseError {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS_CODE.BAD_REQUEST;
    this.name = 'INVALID_PARAMETER';
    this.message = message;
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'Resource Not Found.') {
    super(message);
    this.status = HTTP_STATUS_CODE.NOT_FOUND;
    this.name = 'NOT_FOUND';
    this.message = message;
  }
}



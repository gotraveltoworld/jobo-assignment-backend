/* eslint-disable require-jsdoc */

import express from 'express';
import supertest from 'supertest';

import {HTTP_STATUS_CODE} from '#constants/index.js';
import * as errors from '#errors';
import errorHandler from '#middlewares/errorHandler.js';

describe('Should return exact error object by Error Instance', () => {
  const errorFunctions = Object.values(errors);
  // eslint-disable-next-line new-cap
  const errorInstances = errorFunctions.map((error) => ({instance: new error()}));
  const errorInstancesWithStatus = errorInstances.filter((error) => !!error.instance.status);

  test.each(errorInstancesWithStatus)(
      'when throws $instance.name, status:($instance.status)',
      async ({instance}) => {
        const app = express();
        app.get(`/${instance.name}`, () => {
          throw instance;
        });
        app.use(errorHandler);

        const result = await supertest(app).get(`/${instance.name}`);
        expect(result.status).toEqual(instance.status);
      },
  );

  test('when throws Body Parser JSON Exceptions', (done) => {
    const testMeg = 'test';
    const customizedError = 'JsonSyntaxError';
    const status = HTTP_STATUS_CODE.BAD_REQUEST;

    class BodyParserJsonSyntaxError extends SyntaxError {
      constructor(message) {
        super(message);
        this.status = status;
        this.body = testMeg;
        this.type = 'entity.parse.failed';
      }
    }

    const app = express();
    app.get(`/${customizedError}`, () => {
      throw new BodyParserJsonSyntaxError('Unexpected number in JSON at position 0');
    });
    app.use(errorHandler);

    supertest(app).get(`/${customizedError}`).expect(status, done);
  });
});

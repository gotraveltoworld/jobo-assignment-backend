import express from 'express';
import supertest from 'supertest';

import successHandler from '#middlewares/successHandler.js';

describe('Respond successful status code with payload', () => {
  const endpoint = '/api';

  test('when payload is empty', async () => {
    const app = express();
    app.use(successHandler);
    app.get(`${endpoint}`, (_req, res) => res.success());

    const res = await supertest(app).get(`${endpoint}`);
    expect(res.body.data).toEqual({});
  });

  test('when payload is not empty', async () => {
    const app = express();
    const obj = {ok: true};
    app.use(successHandler);
    app.get(`${endpoint}`, (_req, res) => res.success(obj));

    const res = await supertest(app).get(`${endpoint}`);
    expect(res.body.data).toEqual(obj);
  });
});

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {json, urlencoded} from 'express';

import {NotFoundError} from '#errors';
import errorHandler from '#middlewares/errorHandler.js';
import successHandler from '#middlewares/successHandler.js';
import router from '#src/router.js';

const app = express();
// https://cwe.mitre.org/data/definitions/200.html
app.disable('x-powered-by');
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());

app.use(successHandler);

// Health check.
app.get('/health', (_req, res) => res.success());

app.use('/', cors(), router);

app.all('*', (req) => {
  throw new NotFoundError(`This route '${req.path}' does not exist!!`);
});

app.use(errorHandler);

export default app;

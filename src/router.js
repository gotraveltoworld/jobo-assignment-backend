import express from 'express';

import * as controller from '#src/controller.js';
import {wrapHandlerWithErrorCatcher} from '#utils/index.js';
import {validateSaveOrder, validateGetOrder} from '#validators/validator.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get(
    '/patients',
    wrapHandlerWithErrorCatcher(controller.getPatientList),
);

router.get(
    '/orders/:orderId',
    validateGetOrder,
    wrapHandlerWithErrorCatcher(controller.getOrderDetails),
);

router.post(
    '/orders',
    validateSaveOrder,
    wrapHandlerWithErrorCatcher(controller.saveOrder),
);

export default router;

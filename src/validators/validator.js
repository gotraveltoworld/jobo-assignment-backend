import joi from 'joi';

import {validRequestForReq} from '#validators/index.js';
import UUID_SCHEMA from '#validators/schemas/uuid.js';

export const validateSaveOrder = validRequestForReq(
    {
      body: joi.object({
        message: joi.string().trim().required(),
        patientId: UUID_SCHEMA.required(),
      }),
    },
);

export const validateGetOrder = validRequestForReq(
    {
      params: joi.object({
        orderId: UUID_SCHEMA.required(),
      }),
    },
);

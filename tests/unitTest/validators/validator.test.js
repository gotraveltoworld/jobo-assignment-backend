import {InvalidParameterError} from '#errors';
import {mockNext, mockResponse, mockRequest} from '#unitTest/mockHttpApp.js';
import {
  validateGetOrder,
  validateSaveOrder,
} from '#validators/validator.js';

const orderId = '370e0e64-ccdf-40b0-b7d0-6f35fc3920f0';
const patientId = '370e0e64-ccdf-40b0-b7d0-6f35fc3920f0';
const message = '超過120請施打8u';

describe('Testing validateGetOrder', () => {
  const fixtures = {
    ok: {
      params: {orderId},
    },
    wrongOrderId: {
      params: {orderId: 'uuid'},
    },
  };
  const validator = validateGetOrder;

  test('should pass validation', () => {
    const req = mockRequest({...fixtures.ok});
    const res = mockResponse();
    const next = mockNext();
    validator(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should throw InvalidParameterError because of wrong orderId', () => {
    const req = mockRequest({...fixtures.wrongOrderId});
    const res = mockResponse();
    const next = mockNext();
    expect(() => validator(req, res, next)).toThrow(InvalidParameterError);
    expect(next).toHaveBeenCalledTimes(0);
  });
});

describe('Testing validateSaveOrder', () => {
  const fixtures = {
    ok: {
      body: {patientId, message},
    },
    wrongPatientId: {
      body: {patientId: 'xxx', message},
    },
    emptyMessage: {
      body: {patientId, message: ''},
    },
  };
  const validator = validateSaveOrder;

  test('should pass validation', () => {
    const req = mockRequest({...fixtures.ok});
    const res = mockResponse();
    const next = mockNext();
    validator(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should throw InvalidParameterError because of wrong patientId', () => {
    const req = mockRequest({...fixtures.wrongPatientId});
    const res = mockResponse();
    const next = mockNext();
    expect(() => validator(req, res, next)).toThrow(InvalidParameterError);
    expect(next).toHaveBeenCalledTimes(0);
  });

  test('should throw InvalidParameterError because of empty message', () => {
    const req = mockRequest({...fixtures.emptyMessage});
    const res = mockResponse();
    const next = mockNext();
    expect(() => validator(req, res, next)).toThrow(InvalidParameterError);
    expect(next).toHaveBeenCalledTimes(0);
  });
});

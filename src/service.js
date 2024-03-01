import {NotFoundError} from '#errors';
import createLogger from '#logger';
import {getConn} from '#models/base.model.js';
import OrdersModel from '#models/orders.model.js';
import PatientsModel from '#models/patients.model.js';

const logger = createLogger('services');

const saveOrder = async (patientUuid, message) => {
  const uuid = await getConn().transaction(
      async (dbClient) => {
        const {id: patientId} =
          await PatientsModel.getPatientByUuid(patientUuid, dbClient);

        if (!patientId) {
          logger.warn(`Doesn't exist this patient by (${patientUuid})`);
          throw new NotFoundError();
        }
        const {uuid} = await OrdersModel.saveOrder({message, patientId, dbClient});
        return uuid;
      });

  return {orderId: uuid, message};
};

const getOrder = async (orderId) => {
  const result = await OrdersModel.getOrder(orderId);
  return result || {};
};

const getPatientList = async () => PatientsModel.getPatientList();

export default {
  saveOrder,
  getOrder,
  getPatientList,
};

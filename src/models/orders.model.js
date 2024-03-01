import {getConn} from '#models/base.model.js';

const ORDERS_SCHEMA_TABLE = 'jubo.orders';

const saveOrder = async ({message, patientId, dbClient = null}) => {
  const result = await getConn(dbClient)(ORDERS_SCHEMA_TABLE)
      .insert({
        patient_id: patientId,
        message,
      })
      .onConflict('patient_id')
      .merge({
        message,
        updated_at: new Date(),
      })
      .returning(['uuid', 'message']);
  return result?.[0] || {};
};

const getOrder = async (orderId) =>
  getConn()
      .select(
          'uuid AS orderId',
          'message',
      )
      .from(ORDERS_SCHEMA_TABLE)
      .where('uuid', orderId)
      .first()
      .then((row) => row);

export default {
  saveOrder,
  getOrder,
};

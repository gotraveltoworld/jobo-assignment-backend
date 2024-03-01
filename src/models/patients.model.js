import {getConn} from '#models/base.model.js';

const ORDERS_SCHEMA_TABLE = 'jubo.orders';
const PATIENTS_SCHEMA_TABLE = 'jubo.patients';

const getPatientByUuid = async (patientUuid, dbClient) =>
  getConn(dbClient)
      .select(
          'id',
          'patient_name AS patientName',
      )
      .from(PATIENTS_SCHEMA_TABLE)
      .where('uuid', patientUuid)
      .first()
      .then((row) => row);

const getPatientList = async () =>
  getConn().select(
      'p.uuid AS patientId',
      'p.patient_name AS patientName',
      'p.uuid AS patientId',
      'o.uuid AS orderId',
      'o.message AS message')
      .from(`${PATIENTS_SCHEMA_TABLE} AS p`)
      .leftJoin(`${ORDERS_SCHEMA_TABLE} AS o`, 'p.id', 'o.patient_id');

export default {
  getPatientByUuid,
  getPatientList,
};

import DB from './src/utils/dbConn.js';

const db = DB.getInstance();
// // console.log(db);
const res1 = await db.select(
    'p.uuid AS patientId',
    'p.patient_name AS patientName',
    'p.uuid AS patientId',
    'o.uuid AS orderId',
    'o.message AS message',
).from('patients AS p').leftJoin('orders AS o', 'p.id', 'o.patient_id');
console.log(res1);

// // getPatientByUuid
const patientUuid = 'd9ce8ee8-42c2-4a8a-9b0b-c3bf456e9d9d';
const res2 = await db.select(
    'uuid AS patientId',
    'patient_name AS patientName',
).from('patients').where('uuid', patientUuid).first().then((row) => row);
console.log(res2);

// saveOrder
const timestamp = new Date();
const message = 'testing...qq';
const res3 = await db('orders')
    .returning(['uuid AS orderId', 'message'])
    .insert({
      patient_id: 2,
      message,
    })
    .onConflict('patient_id')
    .merge({
      message,
      updated_at: timestamp,
    });
console.log(res3);
// getOrder

db.destroy();

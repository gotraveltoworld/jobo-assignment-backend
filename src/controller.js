import Service from '#src/service.js';

export const getPatientList = async (_req, res) => {
  res.success(await Service.getPatientList());
};

export const getOrderDetails = async (req, res) => {
  const {orderId} = req.params;
  const response = await Service.getOrder(orderId);
  res.success(response);
};

export const saveOrder = async (req, res) => {
  const {message, patientId} = req.body;
  const response = await Service.saveOrder(patientId, message);
  res.success(response);
};

const { salesModels } = require('../models/index');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await salesModels.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await salesModels.findById(saleId);

  if (!sale.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = {
  findAll,
  findById,
  // createProduct,
};
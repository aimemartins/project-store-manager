const { productsModels } = require('../models/index');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModels.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModels.findById(productId);

  if (product === undefined) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  findAll,
  findById,
};
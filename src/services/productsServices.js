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

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productsModels.insert({ name });

  const result = {
    id: newProductId,
    name,
  };

  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
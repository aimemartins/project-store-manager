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

const updateById = async (name, id) => {
  // if(id === Number)
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const returnId = await productsModels.findById(id);
  if (!returnId) return { type: 'INVALID_VALUE', message: 'Product not found' };

  const updateName = await productsModels.updateById(name, id);
  // const result = {
  //   id: returnId,
  //   name: updateName,
  // };
  return { type: null, message: updateName };
};

const deleteById = async (id) => {
  const product = await productsModels.findById(id);
  if (!product) return { type: 404, message: 'Product not found' };
  await productsModels.deleteById(id);
  return { type: null, message: '' };
};

// const updateById = async (id, name) => {
//   const product = await productModel.productById(id);
//   if (!product) return { type: 404, message: 'Product not found' };

//   const result = await productModel.updateById(id, name);
//   return { type: null, message: result };
// };

module.exports = {
  findAll,
  findById,
  createProduct,
  updateById,
  deleteById,
};
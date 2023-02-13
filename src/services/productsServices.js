const { productsModels } = require('../models/index');

const findAll = async () => {
  const products = await productsModels.findAll();
  return { type: null, message: products };
};

module.exports = {
  findAll,
};
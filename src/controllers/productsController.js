const { productsServices } = require('../services/index');

const listProducts = async (_req, res) => {
  const { message } = await productsServices.findAll();

  // if (type) return res.status(404).json(message);
  
  return res.status(200).json(message);
};

module.exports = {
  listProducts,
};
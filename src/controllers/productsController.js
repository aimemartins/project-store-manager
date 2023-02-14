const { productsServices } = require('../services/index');

const listProducts = async (_req, res) => {
  const { message } = await productsServices.findAll();

  // if (type) return res.status(404).json(message);
  
  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.findById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  // const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsServices.createProduct(name);

  if (type === 'INVALID_NAME') return res.status(400).json({ message });

  if (type === 'INVALID_NAME_LENGTH') return res.status(422).json({ message });

  res.status(201).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
};
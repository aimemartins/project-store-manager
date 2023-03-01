const { productsServices } = require('../services/index');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productsServices.findAll();

  // if (type) return res.status(404).json(message);
  
  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  // const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsServices.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsServices.updateById(name, id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteBy = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.deleteById(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).json(message);
};

const searchProducts = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsServices.searchProducts(q);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateById,
  deleteBy,
  searchProducts,
};
const { salesServices } = require('../services/index');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await salesServices.findAll();

  // if (type) return res.status(404).json(message);

  return res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

// const createSale = async (req, res) => {
//   const array = req.body; // array de objetos;
//   const { type, message } = await salesServices.insertSales(array);

//   if (type) return res.status(errorMap.mapError(type)).json({ message });

//   res.status(201).json(message);
// };

module.exports = {
  listProducts,
  getSale,
  // createSale,
};
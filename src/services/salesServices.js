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

// verifica se tem o productId no banco de dados - req 6
const isThereProductId = async (array) => {
  const map = array.map(({ productId }) => salesModels.findProductId(productId));

  const productIdCaptured = await Promise.all(map);

  return productIdCaptured.some((ele) => !ele.length);
};
// req 6
const insertSales = async (itemsSold) => {
  // validações
  const errors = itemsSold.map((item) => schema.validateSale(item));
  const Error = errors.find((error) => error.type);
  if (Error) {
    if (Error.message.includes('than')) {
      return { type: 422, message: Error.message };
    }
    return { type: 400, message: Error.message };
  }

  // checar se existe já existe o id no banco de dados
  if (await isThereProductId(itemsSold)) return { type: 404, message: 'Product not found' };

  // inserção ao banco de dados
  const { insertId } = await salesModels.createSale();
  const addSales = itemsSold.map((item) => salesModels.insertSale(insertId, item));
  const promise = await Promise.all(addSales);

  const result = {
    id: insertId,
    itemsSold: promise,
  };
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  insertSales,
};
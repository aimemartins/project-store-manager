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

// const insertSales = async (itemsSold) => {
//   // validações
//   const errors = itemsSold.map((item) => schema.validateSale(item));
//   const Error = errors.find((error) => error.type);
//   if (Error) {
//     return Error;
//   }
//   // checar se existe já existe o id no banco de dados

//   // inserção ao banco de dados
//   const createId = await salesModels.createSale();
//   const addSales = itemsSold.map((item) => salesModels.insertSale(createId, item));
//   const promisseAddSales = await Promise.all(addSales);

//   const result = {
//     id: createId,
//     itemsSold: promisseAddSales,
//   };
//   return { type: null, message: result };
// };

module.exports = {
  findAll,
  findById,
  // insertSales,
};
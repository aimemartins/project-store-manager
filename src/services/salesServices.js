const { salesModels } = require('../models/index');
const schema = require('./validations/validationsInputValues');

// Requisito 8 - (Listar todas as vendas)
const findAll = async () => {
  const sales = await salesModels.findAll();
  return { type: null, message: sales };
};

// Requisito 8 - (exibir uma venda de acordo com um id)
const findById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) return error;

  const sale = await salesModels.findById(saleId);

  if (!sale.length) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

// Requisito 6 - Parte 1 (função para validar se productId existe )
const isThereProductId = async (array) => {
  const map = array.map(({ productId }) => salesModels.findProductId(productId));

  const productIdCaptured = await Promise.all(map);
  // .some retorna true se pelo menos um elemento do array não existe no banco de dados
  return productIdCaptured.some((ele) => !ele.length);
};

// Requisito 6 - Parte 2 (SE productId existe, crio o saleId e dps cadastro os produtos e as quantidades)
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
  const addSales = itemsSold.map((item) => salesModels.insertSale(item, insertId));
  const promise = await Promise.all(addSales);

  const result = {
    id: insertId,
    itemsSold: promise,
  };
  return { type: null, message: result };
};

const deleteSale = async (id) => {
  const sale = await salesModels.findById(id);
  if (!sale.length) return { type: 404, message: 'Sale not found' };
  await salesModels.deleteSale(id);
  return { type: null, message: '' };
};

const updateBySaleId = async (itemsSold, id) => {
  const errors = itemsSold.map((item) => schema.validateSale(item));
  const Error = errors.find((error) => error.type);
  if (Error) {
    if (Error.message.includes('than')) { return { type: 422, message: Error.message }; }
    return { type: 400, message: Error.message };
  } // checar se existe já existe o ProductId no banco de dados
  if (await isThereProductId(itemsSold)) return { type: 404, message: 'Product not found' };
  // checar se já existe um saleId no banco de dados
  const findSaleId = await salesModels.findById(id);
 
 console.log('FINDSALEID', findSaleId);
  if (!findSaleId.length) return { type: 404, message: 'Sale not found' };
  const updateSales = itemsSold.map((item) => salesModels.updateBySaleId(item, id));
  const promise = await Promise.all(updateSales);

  const result = {
    saleId: Number(id),
    itemsUpdated: promise,
  };
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  insertSales,
  deleteSale,
  updateBySaleId,
};
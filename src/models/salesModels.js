const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

// Requisito 8 - (Listar todas as vendas)
const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = s.id`,
  );
  // console.log(result[0]);
  return camelize(result);
};

// Requisito 8 - (exibir uma venda de acordo com um id)
const findById = async (productId) => {
  const [sales] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity 
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id, sp.product_id`,
    [productId],
  );
  return camelize(sales);
};

// Requisito 6 - Parte 1 (função para saber se já existe saleId)
const findProductId = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return result;
};

// Requisito 6 - Parte 2 (função para criar um saleId)
const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
    [],
    );
    // console.log(insertId);
    
  return { insertId };
};

// Requisito 6 - Parte 3 (função para inserir produtos e quantidades em um saleId)
const insertSale = async (saleId, { productId, quantity }) => {
   await connection.execute(
  'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
  [saleId, productId, quantity],
  );
  
  return { productId, quantity };
};

const deleteSale = async (id) => {
  const [result] = await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return result;
};

module.exports = {
  findAll,
  findById,
  findProductId,
  createSale,
  insertSale,
  deleteSale,
};

// const columns3 = Object.keys(snakeize(quantity)).join(', ');

  // const placeholders1 = Object.keys(saleId).map((_key) => '?').join(', ');
 
  // const [{ result }] = await connection.execute(
  //   `INSERT INTO StoreManager.sales_products (${columns1},${columns2},${columns3}) 
  //   VALUE (${placeholders1},${placeholders2},${placeholders3})`,
  //   [...Object.values(saleId), ...Object.values(productId), ...Object.values(quantity)],
  // );
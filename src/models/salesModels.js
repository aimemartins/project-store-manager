const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

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

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  // console.log(insertId);
  return insertId;
};

const insertSale = async (saleId, { productId, quantity }) => {
  // const columns1 = Object.keys(snakeize(saleId)).join(', ');
  // const columns2 = Object.keys(snakeize(productId)).join(', ');
  // const columns3 = Object.keys(snakeize(quantity)).join(', ');

  // const placeholders1 = Object.keys(saleId).map((_key) => '?').join(', ');
  // const placeholders2 = Object.keys(productId).map((_key) => '?').join(', ');
  // const placeholders3 = Object.keys(quantity).map((_key) => '?').join(', ');

  // const [{ result }] = await connection.execute(
  //   `INSERT INTO StoreManager.sales_products (${columns1},${columns2},${columns3}) 
  //   VALUE (${placeholders1},${placeholders2},${placeholders3})`,
  //   [...Object.values(saleId), ...Object.values(productId), ...Object.values(quantity)],
  // );

  const [{ result }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
);
  return result;
};

module.exports = {
  findAll,
  findById,
  createSale,
  insertSale,
};
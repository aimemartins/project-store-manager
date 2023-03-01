const express = require('express');
const { productsController } = require('../controllers/index');
// const schema = require('../services/validations/validationsInputValues');

const router = express.Router();

router.get('/search', productsController.searchProducts);

router.get('/', productsController.listProducts);

router.get('/:id', productsController.getProduct);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateById);

router.delete('/:id', productsController.deleteBy);

module.exports = router;
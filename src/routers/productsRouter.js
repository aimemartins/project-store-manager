const express = require('express');
const { productsController } = require('../controllers/index');
// const schema = require('../services/validations/validationsInputValues');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/:id', productsController.getProduct);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateById);

module.exports = router;
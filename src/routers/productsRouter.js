const express = require('express');
const { productsController } = require('../controllers/index');

const router = express.Router();

router.get('/products', productsController.listProducts);

module.exports = router;
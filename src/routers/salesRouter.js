const express = require('express');
const { salesController } = require('../controllers/index');

const router = express.Router();

router.get('/', salesController.listProducts);

router.get('/:id', salesController.getSale);

// router.post('/', salesController.createProduct);

module.exports = router;
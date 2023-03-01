const express = require('express');
const { salesController } = require('../controllers/index');

const router = express.Router();

router.get('/', salesController.listProducts);

router.get('/:id', salesController.getSale);

router.post('/', salesController.createSale);

router.delete('/:id', salesController.deleteSale);

router.put('/:id', salesController.updateBySaleId);

module.exports = router;
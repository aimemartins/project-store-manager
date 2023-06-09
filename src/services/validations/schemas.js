const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const addSaleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().strict().integer().min(1)
    .required(),
});

module.exports = {
  idSchema,
  addProductSchema,
  addSaleSchema,
};
const { idSchema, addSaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  // const { error } = addProductSchema.validate({ name });

  if (!name) {
  return {
      type: 'INVALID_NAME',
      message: '"name" is required',
    }; 
  }
  
  if (name.length < 5) {
    return {
      type: 'INVALID_NAME_LENGTH',
      message: '"name" length must be at least 5 characters long',
    };
  }
    
    return { type: null, message: '' };
};

const validateSale = (sales) => {
  const { error } = addSaleSchema.validate(sales);

  if (error) return { type: error.type, message: error.message };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateSale,
};

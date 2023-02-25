const productMock = {
  id: 1,
  name: 'Martelo de Thor'
}

const newProductMock = { id: 1, ...productMock };

const productListMock = [newProductMock]

const bodyRequest = {
  name: 'Martelo de Thor'
}



module.exports = {
  productMock,
  newProductMock,
  productListMock,
  bodyRequest,
}

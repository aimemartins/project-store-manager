const productMock = {
  id: 1,
  name: 'Martelo de Thor'
}

const newProductMock = { id: 1, ...productMock };

const productListMock = [newProductMock]

const bodyRequest = {
  name: 'Martelo de Thor'
}

const bodyUpdateMock = {
  name: 'Martelo do Batman'
}

const resultRequestUpdated = {
  id: 1,
  name: 'Martelo do Batman'
}

module.exports = {
  productMock,
  newProductMock,
  productListMock,
  bodyRequest,
  bodyUpdateMock,
  resultRequestUpdated,
}

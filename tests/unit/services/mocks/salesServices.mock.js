const validProductId = 1;
const validQuantity = 2;

const invalidProductId = '100';
const invalidQuantity = 'a';



const listSalesMock = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: validProductId,
    quantity: validQuantity
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
]

const validSalesMock = [

  {
    productId: 10,
    quantity: 10
  }
]

const resultMock = {
  "id": undefined,
  "itemsSold": [
    {
      "productId": 10,
      "quantity": 10
    }
  ]
}

const emptyProductIdMock = [
  {
    quantity: validQuantity
  },
  {
    productId: 2,
    quantity: 2
  }
]

const invalidProductIdMock = [
  {
    productId: invalidProductId,
    quantity: validQuantity
  },
  {
    productId: 2,
    quantity: 2
  }
]

const emptyQuantityMock = [
  {
    productId: invalidProductId,
  },
  {
    productId: 2,
    quantity: 2
  }
]

const invalidQuantityMock = [
  {
    productId: validProductId,
    quantity: validQuantity
  },
  {
    productId: 2,
    quantity: 0
  }
]



module.exports = {
  listSalesMock,
  emptyProductIdMock,
  invalidProductIdMock,
  emptyQuantityMock,
  invalidQuantityMock,
  validSalesMock,
  resultMock,
}
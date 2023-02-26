const returnServiceMock = [
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 10,
    "quantity": 10
  }

  /* ... */
]

const bodyRequest = [
  {
    "productId": 10,
    "quantity": 10
  }
]

const saleResultMock = {
  "id": 2,
  "itemsSold": [
    {
      "productId": 10,
      "quantity": 10
    }
  ]
}

const newSaleMock = { id: 1, ...saleResultMock };

const saleListMock = [newSaleMock];

module.exports = {
  saleResultMock,
  newSaleMock,
  saleListMock,
  returnServiceMock,
  bodyRequest,
}
const listSalesMock = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }

  /* ... */
]

const newSaleIdMock = {
  insertId: 3,
}

const newProdAndQuantMock = {
  productId: 2,
  quantity: 5
}

// const newSaleMock = {
//   id: 3,
//   itemsSold: [
//     {
//       productId: 1,
//       quantity: 1
//     },
//     {
//       productId: 2,
//       quantity: 5
//     }
//   ]
// }

module.exports = {
  listSalesMock,
  newSaleIdMock,
  // newSaleMock,
  newProdAndQuantMock,
}
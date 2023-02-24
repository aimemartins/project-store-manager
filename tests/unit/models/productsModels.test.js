const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models/index');

const connection = require('../../../src/models/connection');
const { products, newProduct } = require('./mocks/productsModels.mock');


describe('[ CAMADA MODEL - PRODUCTS ] - Testes de unidade do Model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // act
    const result = await productsModels.findAll();
    // assert
    expect(result).to.be.deep.equal(products);
  })

  it('Recuperando um produto a partir do seu id', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([products[0]]);
    // act
    const result = await productsModels.findAll(1);
    // assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Adicionando um produto', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 9 }]);
    // act
    const result = await productsModels.insert(newProduct);
    // assert
    expect(result).to.be.deep.equal(9);
  })

  this.afterEach(function () {
    sinon.restore();
  })
});
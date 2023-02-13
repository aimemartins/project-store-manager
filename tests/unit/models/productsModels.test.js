const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models/index');

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/productsModels.mock');


describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de produtos', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // act
    const result = await productsModels.findAll();
    // assert
    expect(result).to.be.deep.equal(products);
  })

  this.afterEach(function () {
    sinon.restore();
  })
});
const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models/index');

const connection = require('../../../src/models/connection');
const { products } = require('./mocks/productsModels.mock');
const { func } = require('joi');


describe('Testes de unidade do model de produtos', function () {
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

  this.afterEach(function () {
    sinon.restore();
  })
});
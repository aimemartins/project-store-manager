const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices } = require('../../../src/services/index')
const { productsModels } = require('../../../src/models/index');

const { productSearchById } = require('./mocks/productsServices.mock');


describe('Verificando service para produto', function () {

  describe('listagem de produtos', function () {

    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productsModels, 'findAll').resolves(productSearchById);

      // act
      const result = await productsServices.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productSearchById);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
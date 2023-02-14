const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices } = require('../../../src/services/index')
const { productsModels } = require('../../../src/models/index');

const { productSearchById } = require('./mocks/productsServices.mock');


describe('Verificando Service para produto', function () {

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

  describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await productsServices.findById('a');

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    })

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productsModels, 'findById').resolves(undefined);

      // act
      const result = await productsServices.findById(1);
      // console.log(result)

      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('retorna o produto caso ID seja existente', async function () {
      // arrange
      sinon.stub(productsModels, 'findById').resolves(productSearchById);
      //console.log(productSearchById);

      // act
      const result = await productsServices.findById(1);
      //console.log(result);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productSearchById);
    })

  })

  afterEach(function () {
    sinon.restore();
  });

});
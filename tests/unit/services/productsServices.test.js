const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices } = require('../../../src/services/index')
const { productsModels } = require('../../../src/models/index');

const { productSearchById, validName, invalidName } = require('./mocks/productsServices.mock');


describe('[ CAMADA SERVICE ]- Verificando Service para produto', function () {

  describe('LISTAGEM DE PRODUTOS', function () {

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

  describe('BUSCA DE UM PRODUTO', function () {
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

  describe('CADASTRO DE UM PRODUTO', function () {

    it('retorna um erro caso a requisição não tenha o campo "name"', async function () {
      // arrange : Não é preciso de um arranjo;

      // act
      const result = await productsServices.createProduct(null);

      // assert
      expect(result.type).to.be.equal('INVALID_NAME');
      expect(result.message).to.be.equal('"name" is required');
    });

    it('retorna um erro ao passar um nome que não tenha pelo menos 5 caracteres', async function () {
      // arrange : Não é preciso de um arranjo;

      // act
      const result = await productsServices.createProduct(invalidName);

      // assert
      expect(result.type).to.be.equal('INVALID_NAME_LENGTH');
      expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('retorna o produto cadastrado caso seja passado valores válidos', async function () {
      // arrange
      sinon.stub(productsModels, 'insert').resolves(1);
      // act
      const result = await productsServices.createProduct(validName);

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(productSearchById);
    });
  });



  afterEach(function () {
    sinon.restore();
  });

});
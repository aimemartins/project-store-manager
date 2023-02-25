const { expect } = require('chai');
const sinon = require('sinon');
const { salesServices } = require('../../../src/services/index');
const { salesModels } = require('../../../src/models/index')

const {
  listSalesMock,
  emptyProductIdMock,
  invalidProductIdMock,
  emptyQuantityMock,
  invalidQuantityMock,
  validSalesMock,
  resultMock
} = require('./mocks/salesServices.mock');
const connection = require('../../../src/models/connection');

describe('[ CAMADA SERVICE - SALES ]- Verificando Service para Sales', function () {

  describe('LISTAGEM DE VENDAS', function () {

    it('retorna a lista completa de sales', async function () {
      // arrange
      sinon.stub(salesModels, 'findAll').resolves(listSalesMock);

      // act
      const result = await salesServices.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(listSalesMock);
    });
  });

  describe('BUSCA DE UMA VENDA', function () {
    it('retorna um erro caso receba um saleId inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await salesServices.findById('a');

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    })

    it('retorna um erro caso o saleId não exista', async function () {
      // arrange
      sinon.stub(salesModels, 'findById').resolves([]);

      // act
      const result = await salesServices.findById(100);
      // console.log(result)

      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('retorna a venda caso saleId seja existente', async function () {
      // arrange
      sinon.stub(salesModels, 'findById').resolves(listSalesMock);
      //console.log(productSearchById);

      // act
      const result = await salesServices.findById(1);
      //console.log(result);
      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(listSalesMock);
    })
  })

  describe('CADASTRO DE UMA VENDA ', function () {

    it('retorna um erro caso a requisição não tenha o campo "ProductId"', async function () {
      // arrange : Não é preciso de um arranjo;

      // act
      const result = await salesServices.insertSales(emptyProductIdMock);

      // assert
      expect(result.type).to.be.equal(400);
      expect(result.message).to.be.equal('"productId" is required');
    });

    it('retorna um erro caso a requisição tenha o campo "ProductId" inválido', async function () {
      // arrange : Não é preciso de um arranjo;

      // act
      const result = await salesServices.insertSales(invalidProductIdMock);

      // assert
      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.equal('Product not found');
    });

    it('retorna um erro caso a requisição não tenha o campo "quantity"', async function () {
      // arrange : Não é preciso de um arranjo;

      // act
      const result = await salesServices.insertSales(emptyQuantityMock);

      // assert
      expect(result.type).to.be.equal(400);
      expect(result.message).to.be.equal('"quantity" is required');
    });


    it('retorna um erro caso a requisição tenha o campo "quantity" inválido ', async function () {
      // arrange : Não é preciso de um arranjo;

      // act
      const result = await salesServices.insertSales(invalidQuantityMock);

      // assert
      expect(result.type).to.be.equal(422);
      expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });


    it('retorna a venda cadastrada com seus produtos e quantidades caso seja passado valores válidos', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([[listSalesMock[0]]]); // PQ ESSA FUNÇÃO É RESOLVIDA ASSIM?!
      // act
      const result = await salesServices.insertSales(validSalesMock);

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(resultMock);
    });



  })


  afterEach(function () {
    sinon.restore();
  });
});
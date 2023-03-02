const { expect } = require('chai');
const sinon = require('sinon');
const { salesModels } = require('../../../src/models/index');

const connection = require('../../../src/models/connection');
const { listSalesMock, newSaleIdMock, newProdAndQuantMock } = require('./mocks/salesModels.mock');

describe('[ CAMADA MODEL - SALES ] - Testes de unidade do Model de sales', function () {
  it('Recuperando a lista de sales', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([listSalesMock]);
    // act
    const result = await salesModels.findAll();
    // assert
    expect(result).to.be.deep.equal(listSalesMock);
  })

  it('Recuperando um sale a partir do seu id', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([listSalesMock[0]]);
    // act
    const result = await salesModels.findAll(1);
    // assert
    expect(result).to.be.deep.equal(listSalesMock[0]);
  });

  it('Testando se um saleId já existe no banco de dados', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([listSalesMock[0]]);
    // act
    const result = await salesModels.findProductId(1);
    // assert
    expect(result).to.be.deep.equal(listSalesMock[0]);
  });



  it('Criando uma saleId de uma venda', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    // act
    const result = await salesModels.createSale(newSaleIdMock);
    // assert
    expect(result).to.be.deep.equal(newSaleIdMock);
  })

  it('Adicionando a um saleId de venda os produtos(productId) e suas quantidades(quantity)', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves({ productId: 2, quantity: 5 });
    // act
    const result = await salesModels.insertSale(newProdAndQuantMock, 3);
    // assert
    expect(result).to.be.deep.equal({ productId: 2, quantity: 5 });
  })


  this.afterEach(function () {
    sinon.restore();
  })
})
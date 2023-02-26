const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models/index');

const connection = require('../../../src/models/connection');
const { products, newProduct, updateProduct } = require('./mocks/productsModels.mock');
const { updateById } = require('../../../src/models/productsModels');


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

  // TIRAR DÚVIDA SOBRE ESSE TÓPICO ABAIXO:

  it('Atualizando um produto', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([]);
    // act
    const result = await productsModels.updateById(updateProduct.name, updateProduct.id);
    // assert
    expect(result).to.be.deep.equal(updateProduct);
  })

  // it('Deleta um produto a partir do seu id', async function () {
  //   // arrange
  //   sinon.stub(connection, 'execute').resolves([products[0]]);
  //   // act
  //   const result = await productsModels.deleteById(1);
  //   // assert
  //   expect(result).to.be.deep.equal(products[0]);
  // });

  this.afterEach(function () {
    sinon.restore();
  })
});
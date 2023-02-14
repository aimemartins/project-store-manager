const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsServices } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');
const { productListMock } = require('./mocks/productsController.mock');

describe('Teste de unidade do productController', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista ', async function () {
      //arange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findAll')
        .resolves({ type: null, message: productListMock });
      //act

      await productsController.listProducts(req, res);

      //assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productListMock);
    })
  })
  afterEach(function () {
    sinon.restore();
  })
});
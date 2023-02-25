const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsServices } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');
const { productListMock, productMock, bodyRequest, bodyUpdateMock, resultRequestUpdated } = require('./mocks/productsController.mock');

describe('[ CAMADA CONTROLLER ]- Teste de unidade do productController', function () {
  describe('LISTANDO OS PRODUTOS', function () {
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

  describe('BUSCANDO UM PRODUTO COM BASE EM SEU ID', function () {
    it('Deve retornar o status 201 e os dados do produto ', async function () {
      //arange
      const res = {};
      const req = {
        params: { id: 1 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findById')
        .resolves({ type: null, message: productMock });
      //act

      await productsController.getProduct(req, res);

      //assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productMock);
    })
  })

  describe('CADASTRANDO PRODUTOS', function () {
    it('Deve retornar o status 201 e os dados do id do produto', async function () {
      //arange
      const res = {};
      const req = {
        body: bodyRequest
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'createProduct')
        .resolves({ type: null, message: productMock });
      //act

      await productsController.createProduct(req, res);

      //assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productMock);
    })
  })

  describe('ATUALIZANDO PRODUTOS', function () {
    it('Deve retornar o status 201 e os dados do id do produto', async function () {
      //arange
      const res = {};
      const req = {
        params: { id: 1 },
        body: bodyUpdateMock
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'updateById')
        .resolves({ type: null, message: resultRequestUpdated });
      //act

      await productsController.updateById(req, res);

      //assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(resultRequestUpdated);
    })
  })

  describe('DELETANDO PRODUTOS', function () {
    it('Deve retornar o status 204', async function () {
      //arange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'deleteById')
        .resolves({ type: null, message: '' });
      //act

      await productsController.deleteBy(req, res);

      //assert
      expect(res.status).to.have.been.calledWith(204);

    })
  })


  afterEach(function () {
    sinon.restore();
  })
});
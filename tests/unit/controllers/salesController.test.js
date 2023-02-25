const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesServices } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');
const {
  saleResultMock,
  newSaleMock,
  saleListMock,
  returnServiceMock,
  bodyRequest,
} = require('./mocks/salesController.mock');

describe('[ CAMADA CONTROLLER ]- Teste de unidade do salesController', function () {
  describe('LISTANDO AS VENDAS', function () {
    it('Deve retornar o status 200 e a lista de vendas', async function () {
      //arange
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'findAll')
        .resolves({ type: null, message: saleListMock });
      //act

      await salesController.listProducts(req, res);

      //assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleListMock);
    })
  })

  describe('BUSCANDO UMA VENDA COM BASE EM SEU ID', function () {
    it('Deve retornar o status 200 e os dados do id da venda', async function () {
      //arange
      const res = {};
      const req = {
        params: { id: 2 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'findById')
        .resolves({ type: null, message: saleResultMock });
      //act

      await salesController.getSale(req, res);

      //assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleResultMock);
    })
  })

  describe('CADASTRANDO VENDAS', function () {
    it('Deve retornar o status 201 e os dados do id da venda', async function () {
      //arange
      const res = {};
      const req = {
        body: bodyRequest
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'insertSales')
        .resolves({ type: null, message: saleResultMock });
      //act

      await salesController.createSale(req, res);

      //assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleResultMock);
    })
  })


  afterEach(function () {
    sinon.restore();
  })
})

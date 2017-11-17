/**
 * Tests for the Rapaport Price Integration
 */

const chai = require('chai');
const testHelpers = require('../testHelpers');
const rapaportPrice = require('../../app/supplierAPIs/rapaportPrice');
const { Supplier, Price, HistoricPrice } = require('../../app/models/index').db();

const should = chai.should();

describe('Rapaport Price Integration', function () {
  this.timeout(100000);
  const priceObj = {
    shape: 'round',
    color: 'd',
    clarity: 'if',
    caratPrice: 770,
    lowSize: 0.01,
    highSize: 0.03,
    date: '2017-10-27',
  };
  let savedObj;
  let savedObj2;

  before(done => {
    testHelpers.syncDatabase()
      .then(() => testHelpers.flushDatabase())
      .then(() => Supplier.create({
        name: 'Rapaport',
        apiUrl: 'https://technet.rapaport.com:449/HTTP/JSON/Prices/GetPriceSheet.aspx',
        apiType: 'JSONObject',
        apiUsername: 'davids123',
        apiPassword: 'fredsplace',
      }))
      .then(() => done());
  });

  /**
   * #######################################
   * SAVE PRICE TO DB
   * #######################################
   */
  describe('save price to db', () => {
    it('should check if we have all values', done => {
      rapaportPrice.savePrice()
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    it('should save the price', done => {
      rapaportPrice.savePrice(priceObj)
        .then(price => {
          savedObj = price;
          price.shape.should.equal(priceObj.shape);
          price.color.should.equal(priceObj.color);
          price.clarity.should.equal(priceObj.clarity);
          price.lowSize.should.equal(priceObj.lowSize.toString());
          price.highSize.should.equal(priceObj.highSize.toString());
          price.caratPrice.should.equal(priceObj.caratPrice.toString());
          price.date.should.equal(priceObj.date);
          done();
        });
    });
  });

  /**
   * #######################################
   * REMOVE PRICE FROM DB
   * #######################################
   */
  describe('remove price function', () => {
    it('should check if we have all values', done => {
      rapaportPrice.removePrice()
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    it('should remove the price from the database', done => {
      rapaportPrice.removePrice(savedObj)
        .then(() => Price.find({ where: { id: savedObj.id } }))
        .then(results => {
          should.equal(results, null);
          done();
        });
    });
  });

  /**
   * #######################################
   * MOVE PRICE TO HISTORIC TABLE
   * #######################################
   */
  describe('move to historic function', () => {
    it('should check if we have all values', done => {
      rapaportPrice.moveToHistoric()
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    it('should move the old price to historic and return the new price', done => {
      rapaportPrice.moveToHistoric(priceObj, savedObj)
        .then(result => {
          savedObj2 = result;
          savedObj2.id.should.not.equal(savedObj.id);
          return HistoricPrice.find({ where: { shape: 'round' } });
        })
        .then(result => {
          result.caratPrice.should.equal('770');
          done();
        });
    });

    it('should have removed the old one', done => {
      Price.find({ where: { id: savedObj.id } })
        .then(result => {
          should.equal(result, null);
          done();
        });
    });
  });

  /**
   * #######################################
   * CHECK PRICE
   * #######################################
   */
  describe('check price function', () => {
    it('should check if we have all values', done => {
      rapaportPrice.checkPrice()
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    let savedObj3;
    it('should insert the price if it didnt exist before', done => {
      priceObj.shape = 'pear';
      priceObj.caratPrice = 700;
      rapaportPrice.checkPrice(priceObj)
        .then(result => {
          savedObj3 = result;
          savedObj3.id.should.not.equal(savedObj2.id);
          done();
        });
    });

    it('should return the existing price if nothing has changed', done => {
      rapaportPrice.checkPrice(priceObj)
        .then(result => {
          result.id.should.equal(savedObj3.id);
          done();
        });
    });

    it('should return a new price if the price has changed', done => {
      priceObj.caratPrice = 600;
      rapaportPrice.checkPrice(priceObj)
        .then(result => {
          result.id.should.not.equal(savedObj3.id);
          done();
        });
    });
  });

  after(done => {
    testHelpers.flushDatabase()
      .then(() => done());
  });
});

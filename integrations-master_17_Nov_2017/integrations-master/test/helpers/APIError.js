/**
 * Tests for the API error saver
 */

const chai = require('chai');
const testHelpers = require('../testHelpers');
const APIError = require('../../app/helpers/APIError');
const { Supplier } = require('../../app/models/index').db();

const should = chai.should();

describe('APIError Helper', () => {
  let testSupplier;
  const obj = {
    shape: 'round',
    low_size: 0.18,
    high_size: 0.22,
    color: 'j',
    clarity: 'vs1',
    caratprice: 910,
    date: '2017-10-27'
  };

  before(done => {
    testHelpers.syncDatabase()
      .then(() => testHelpers.flushDatabase())
      .then(() => Supplier.create({
        name: 'Test Supplier',
      }))
      .then(supplier => {
        testSupplier = supplier;
        done();
      });
  });

  it('should error when missing values', done => {
    APIError.saveError()
      .then(() => console.log('shouldnt work'))
      .catch(error => {
        error.message.should.equal('Missing values.');
        done();
      });
  });

  it('should save to the database', done => {
    APIError.saveError(obj, testSupplier.id)
      .then(response => {
        response.should.have.property('id');
        done();
      });
  });

  after(done => {
    testHelpers.flushDatabase()
      .then(() => done());
  });
});

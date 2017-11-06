/**
 * Test API Call helper
 */
const chai = require('chai');
const testHelpers = require('../testHelpers');
const APICall = require('../../app/helpers/APICall');
const { Supplier, ApiCall } = require('../../app/models/index').db();

const should = chai.should();

describe('APICall', () => {
  let testSupplier;
  let testAPICall;

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

  describe('createAPICall', () => {
    it('should error if it doesnt have all values', done => {
      APICall.createAPICall()
        .then(() => console.log('should not work'))
        .catch(error => {
          error.message.should.equal('Missing supplierId.');
          done();
        });
    });

    it('should create a new entry in the database', done => {
      APICall.createAPICall(testSupplier.id)
        .then(response => {
          response.should.have.property('id');
          done();
        });
    });

    it('should link the api call to the correct supplier', done => {
      ApiCall.findAll({
        include: [Supplier],
      })
        .then(results => {
          results.should.have.length(1);
          [testAPICall] = results;
          testAPICall.Supplier.name.should.equal(testSupplier.name);
          testAPICall.status.should.equal('starting');
          done();
        });
    });

    it('should add the api call to the has many of the supplier', done => {
      Supplier.find({ where: { id: testSupplier.id }, include: [ApiCall] })
        .then(result => {
          result.ApiCalls.should.have.length(1);
          result.ApiCalls[0].id.should.equal(testAPICall.id);
          done();
        });
    });
  });

  describe('updateAPICall', () => {
    it('should error when not having all values', done => {
      APICall.updateAPICall()
        .then(() => console.log('should not work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    it('should update the apicall with the correct status', done => {
      APICall.updateAPICall(testAPICall, 'finished')
        .then(() => ApiCall.findById(testAPICall.id))
        .then(result => {
          result.status.should.equal('finished');
          done();
        });
    });
  });

  after(done => {
    testHelpers.flushDatabase()
      .then(() => done());
  });
});

/**
 * Testing supplier controller
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const server = require('../../app');
const testHelpers = require('../testHelpers');
const { Supplier } = require('../../app/models/index').db();

const should = chai.should();
chai.use(chaiHttp);

describe('Supplier Controller', () => {
  const agent1 = request.agent(server);
  let supplier;
  let token;

  before(done => {
    testHelpers.syncDatabase()
      .then(() => testHelpers.flushDatabase())
      .then(() => testHelpers.sampleUser('admin'))
      .then(obj => {
        ({ token } = obj);
        return Supplier.create({
          name: 'Test Supplier',
          apiUrl: 'http://nos.nl',
        });
      })
      .then(result => {
        supplier = result;
        done();
      });
  });

  /**
   * ###########################
   * Get all suppliers
   * ###########################
   */
  it('should call the GET / endpoint', done => {
    agent1.get('/supplier')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((error, response) => {
        response.body.data.length.should.equal(1);
        response.body.data[0].name.should.equal(supplier.name);
        response.body.data[0].apiUrl.should.equal(supplier.apiUrl);
        done();
      });
  });

  /**
   * ##########################
   * Get a single supplier
   * ##########################
   */
  it('should not work when not sending a uuid', done => {
    agent1.get('/supplier/abc')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((error, response) => {
        response.body.statusText.should.equal('Supplier not found.');
        done();
      });
  });

  it('should not work when sending a non-existant UUID', done => {
    agent1.get('/supplier/A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((error, response) => {
        response.body.statusText.should.equal('Supplier not found.');
        done();
      });
  });

  it('should work when sending a valid UUID', done => {
    agent1.get(`/supplier/${supplier.id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((error, response) => {
        response.body.data.name.should.equal(supplier.name);
        response.body.data.apiUrl.should.equal(supplier.apiUrl);
        done();
      });
  });

  after(done => {
    testHelpers.flushDatabase()
      .then(() => done());
  });
});

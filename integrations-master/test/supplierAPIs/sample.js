/**
 * Sample Test to test CI and make sure everything works
 */
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('chai').should();
const server = require('../../app');

chai.use(chaiHttp);
const agent = request.agent(server);

describe('Sample test', () => {
  it('should work', done => {
    agent.get('/')
      .end((error, res) => {
        res.statusCode.should.equal(200);
        done();
      });
  });

  after(done => {
    server.shutdown(done);
  });
});

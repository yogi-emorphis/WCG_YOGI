/**
 * Testing authentication flow
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const server = require('../../app');
const testHelpers = require('../testHelpers');
const { User } = require('../../app/models/index').db();

const should = chai.should();
chai.use(chaiHttp);

describe('Authentication (Passport / Oauth2)', () => {
  const agent1 = request.agent(server);
  let user;
  let token;

  before(done => {
    testHelpers.syncDatabase()
      .then(() => testHelpers.flushDatabase())
      .then(() => done());
  });

  describe('retrieving bearer token', () => {
    it('should error when missing client uname / password', done => {
      agent1.post('/auth/login')
        .set('Content-Type', 'application/json')
        .auth('', '')
        .send({})
        .end((error, response) => {
          response.status.should.equal(401);
          done();
        });
    });

    it('should error when email does not exist', done => {
      agent1.post('/auth/login')
        .set('Content-Type', 'application/json')
        .auth('andre.woons@gmail.com', 'test')
        .send({})
        .end((error, response) => {
          response.status.should.equal(401);
          response.body.authError.should.equal(1);
          done();
        });
    });

    it('should error when password is not correct', done => {
      User.create({
        email: 'andre.woons@gmail.com',
        password: 'pw',
      })
        .then(result => {
          user = result;
          agent1.post('/auth/login')
            .set('Content-Type', 'application/json')
            .auth('andre.woons@gmail.com', 'test')
            .send({})
            .end((error, response) => {
              response.status.should.equal(401);
              response.body.authError.should.equal(1);
              done();
            });
        });
    });

    it('should error when username is incorrect', done => {
      user.password = '$2a$12$7f9OT6IpPie1xBNhcjseteDqsUccNncxzqXE28WJ2LwKDPpEdvSlu';
      user.save()
        .then(result => {
          user = result;
          agent1.post('/auth/login')
            .set('Content-Type', 'application/json')
            .auth('andre.woons@gmail.com', 'test')
            .send({
              grant_type: 'password',
              username: 'andre.woons@gmail.co',
              password: 'test',
            })
            .end((error, response) => {
              response.status.should.equal(401);
              response.body.authError.should.equal(1);
              done();
            });
        });
    });

    it('should error when pw in body is incorrect', done => {
      agent1.post('/auth/login')
        .set('Content-Type', 'application/json')
        .auth('andre.woons@gmail.com', 'test')
        .send({
          grant_type: 'password',
          username: 'andre.woons@gmail.com',
          password: 'test2',
        })
        .end((error, response) => {
          response.status.should.equal(401);
          response.body.authError.should.equal(1);
          done();
        });
    });

    it('should error when user isnt valid');

    it('should return bearer token when details are correct', done => {
      agent1.post('/auth/login')
        .set('Content-Type', 'application/json')
        .auth('andre.woons@gmail.com', 'test')
        .send({
          grant_type: 'password',
          username: 'andre.woons@gmail.com',
          password: 'test',
        })
        .end((error, response) => {
          token = response.body.access_token;
          response.status.should.equal(200);
          done();
        });
    });
  });

  describe('authenticating', () => {
    it('should error when bearer token can not be found', done => {
      agent1.get('/auth/check')
        .set('Authorization', 'Bearer abc')
        .set('Content-Type', 'application/json')
        .send({})
        .end((error, response) => {
          response.status.should.equal(401);
          done();
        });
    });

    it('should error when user isnt valid');

    it('should work when bearer token is correct', done => {
      agent1.get('/auth/check')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send({})
        .end((error, response) => {
          response.body.statusText.should.equal('OK');
          response.status.should.equal(200);
          done();
        });
    });
  });

  after(done => {
    testHelpers.flushDatabase()
      .then(() => done());
  });
});

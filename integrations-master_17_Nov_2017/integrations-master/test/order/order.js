/**
 * Testing Order controller
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const server = require('../../app');
const testHelpers = require('../testHelpers');
// const { } = require('../../app/models/index').db();

const { isUserOwnerOfOrder } = require('../../app/controllers/order/orderUtils');

const should = chai.should();
chai.use(chaiHttp);

describe('Order Controller', () => {
  const agent1 = request.agent(server);
  let supplier;
  let user;
  let diamond;
  let location;
  let order;
  let orderItem;
  let payment;
  let token;

  /**
   * ##########################
   * What do we need for this test
   * - customer
   * - supplier
   * - diamond
   * - location
   * - order
   * - orderitem
   * - payment
   * #########################
   */
  before(done => {
    testHelpers.syncDatabase()
      .then(() => testHelpers.flushDatabase())
      .then(() => testHelpers.sampleOrderComplete())
      .then(obj => {
        ({
          supplier, user, diamond, location, order, orderItem, payment, token,
        } = obj);
        done();
      });
  });

  /**
   * ###########################
   * Util functions
   * ###########################
   */
  describe('should check if customer is owner of an order', () => {
    it('should not work when missing order and customer', done => {
      isUserOwnerOfOrder()
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    it('should error when user is not owner of an order', done => {
      order.setUser()
        .then(() => isUserOwnerOfOrder(order, user.id))
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Not allowed.');
          done();
        });
    });

    it('should work when user is owner of order', done => {
      order.setUser(user.id)
        .then(() => isUserOwnerOfOrder(order, user.id))
        .then(res => {
          res.should.equal(true);
          done();
        });
    });
  });

  /**
   * ###########################
   * Get all orders
   * ###########################
   */
  it('should call the GET / endpoint', done => {
    agent1.get('/order')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((error, response) => {
        response.body.data.length.should.equal(1);
        const res = response.body.data[0];
        res.orderItems.length.should.equal(1);
        res.payments.length.should.equal(1);
        done();
      });
  });

  /**
   * ##########################
   * Get a single order
   * ##########################
   */
  xit('should not work when not sending a uuid', done => {
    agent1.get('/order/abc')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((error, response) => {
        response.body.statusText.should.equal('Supplier not found.');
        done();
      });
  });

  xit('should not work when sending a non-existant UUID', done => {
    agent1.get('/order/A0EEBC99-9C0B-4EF8-BB6D-6BB9BD380A11')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((error, response) => {
        response.body.statusText.should.equal('Supplier not found.');
        done();
      });
  });

  xit('should work when sending a valid UUID', done => {
    agent1.get(`/order/${supplier.id}`)
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
    // testHelpers.flushDatabase()
    //   .then(() => done());
    done();
  });
});

/**
 * Tests order
 */

const fs = require('fs');

const onlyJs = function (file) {
  return /\.js$/.test(file);
};

// make sure the process env is ALWAYS test
process.env.NODE_ENV = 'test';

// set max listeners to unlimited for testing
process.setMaxListeners(0);

/* Auth tests */
const auths = fs.readdirSync(`${__dirname}/auth`).filter(onlyJs);

auths.forEach(auth => {
  require(`./auth/${auth}`);
});

/* Supplier Controller tests */
const suppliers = fs.readdirSync(`${__dirname}/supplier`).filter(onlyJs);

suppliers.forEach(supplier => {
  require(`./supplier/${supplier}`);
});

/* Order Controller tests */
const orders = fs.readdirSync(`${__dirname}/order`).filter(onlyJs);

orders.forEach(order => {
  require(`./order/${order}`);
});

/* Supplier API tests */
const supplierAPIs = fs.readdirSync(`${__dirname}/supplierAPIs`).filter(onlyJs);

supplierAPIs.forEach(supplierAPI => {
  require(`./supplierAPIs/${supplierAPI}`);
});

/* Helper tests */
const helpers = fs.readdirSync(`${__dirname}/helpers`).filter(onlyJs);

helpers.forEach(helper => {
  require(`./helpers/${helper}`);
});

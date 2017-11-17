'use strict';

const db = require('./app/models/index').db();
const moment = require('moment');

const o1 = {
  orderDate: moment('2017-10-11').toDate(),
  status: 'Delivered',
};

const oi1 = {
  confirmationStatus: 'confirmed',
  askingPrice: 6925.00,
  buyingPrice: 6925.00,
  endCustomerName: 'Andrew Mohan',
  customerOrderNumber: '13239',
  deliveryDeadline: moment('2017-10-17').toDate(),
  deliveryDate: moment('2017-10-17').toDate(),
  deliveryStatus: 'Delivered',
};

const o2 = {
  orderDate: moment('2017-10-25').toDate(),
  status: 'Delivered',
};

const oi2 = {
  confirmationStatus: 'confirmed',
  askingPrice: 3243.00,
  buyingPrice: 3243.00,
  endCustomerName: 'Daniel',
  customerOrderNumber: '13329',
  deliveryDeadline: moment('2017-11-03').toDate(),
  deliveryDate: moment('2017-11-03').toDate(),
  deliveryStatus: 'Delivered',
};

const o3 = {
  orderDate: moment('2017-10-26').toDate(),
  status: 'At Supplier',
};

const oi3 = {
  confirmationStatus: 'confirmed',
  askingPrice: 594.09,
  buyingPrice: 594.09,
  endCustomerName: 'Scott Jordan',
  customerOrderNumber: '13334',
  deliveryDeadline: moment('2017-11-10').toDate(),
  deliveryStatus: 'In Transit',
};

const o4 = {
  orderDate: moment('2017-10-27').toDate(),
  status: 'Delivered',
};

const oi4 = {
  confirmationStatus: 'confirmed',
  askingPrice: 707.00,
  buyingPrice: 707.00,
  endCustomerName: 'Cian OConnor',
  customerOrderNumber: '13263',
  deliveryDeadline: moment('2017-11-10').toDate(),
  deliveryDate: moment('2017-11-10').toDate(),
  deliveryStatus: 'Delivered',
};

const o5 = {
  orderDate: moment('2017-10-25').toDate(),
  status: 'In Transit',
};

const oi5 = {
  confirmationStatus: 'confirmed',
  askingPrice: 5869.00,
  buyingPrice: 5869.00,
  endCustomerName: 'Ioannis Deriziotis',
  customerOrderNumber: '13365',
  deliveryDeadline: moment('2017-11-10').toDate(),
  deliveryStatus: 'In Transit',
};

const o6 = {
  orderDate: moment('2017-10-31').toDate(),
  status: 'In Transit',
};

const oi6 = {
  confirmationStatus: 'confirmed',
  askingPrice: 6896.70,
  buyingPrice: 6896.70,
  endCustomerName: 'Mikhael Bagga',
  customerOrderNumber: '13366',
  deliveryDeadline: moment('2017-11-10').toDate(),
  deliveryStatus: 'In Transit',
};

const o7 = {
  orderDate: moment('2017-10-25').toDate(),
  status: 'Delivered',
};

const oi7 = {
  confirmationStatus: 'confirmed',
  askingPrice: 3243.00,
  buyingPrice: 3243.00,
  endCustomerName: 'Daniel',
  customerOrderNumber: '13329',
  deliveryDeadline: moment('2017-11-03').toDate(),
  deliveryDate: moment('2017-11-03').toDate(),
  deliveryStatus: 'Delivered',
};

const o8 = {
  orderDate: moment('2017-11-03').toDate(),
  status: 'In Transit',
};

const oi8 = {
  confirmationStatus: 'confirmed',
  askingPrice: 1622.00,
  buyingPrice: 1622.00,
  endCustomerName: 'Samy Essalhi',
  customerOrderNumber: '13402',
  deliveryDeadline: moment('2017-11-10').toDate(),
  deliveryStatus: 'In Transit',
};

const o9 = {
  orderDate: moment('2017-11-06').toDate(),
  status: 'In Transit',
};

const oi9 = {
  confirmationStatus: 'confirmed',
  askingPrice: 1430.00,
  buyingPrice: 1389.00,
  endCustomerName: 'Ilhan Beratli',
  customerOrderNumber: '13408',
  deliveryDeadline: moment('2017-11-15').toDate(),
  deliveryStatus: 'In Transit',
};

const o10 = {
  orderDate: moment('2017-11-07').toDate(),
  status: 'Confirmed',
};

const oi10 = {
  confirmationStatus: 'confirmed',
  askingPrice: 1482.00,
  buyingPrice: 1452.00,
  endCustomerName: 'Louise Roper',
  customerOrderNumber: '13422',
  deliveryDeadline: moment('2017-11-03').toDate(),
  deliveryStatus: 'In Transit',
};

const o11 = {
  orderDate: moment('2017-11-08').toDate(),
  status: 'Confirmed',
};

const oi11 = {
  confirmationStatus: 'confirmed',
  askingPrice: 418.00,
  buyingPrice: 418.00,
  endCustomerName: 'Pierre Herlem',
  customerOrderNumber: '13432',
  deliveryDeadline: moment('2017-11-14').toDate(),
  deliveryStatus: 'In Transit',
};

const createOrder = function (o, oi, d, p, l, cl, u, c) {
  let soi;
  let so;
  return db.OrderItem.create(oi)
    .then(r => {
      soi = r;
      return soi.setDiamond(d.id);
    })
    .then(() => soi.setLocation(l.id))
    .then(() => {
      return db.Order.create(o);
    })
    .then(r => {
      so = r;
      return so.setUser(u.id);
    })
    // .then(() => p.setOrder(o.id))
    // .then(() => p.setUser(u.id))
    // .then(() => o.setUser(u.id))
    // .then(() => o.setPayments([p.id]))
    .then(() => so.setOrderItems([soi.id]))
    .then(() => c.setLocations([cl.id]))
    .then(() => Promise.resolve());
};

const run = function () {
  let d1;
  let d2;
  let d3;
  let d4;
  let d5;
  let d6;
  let d7;
  let d8;
  let d9;
  let d10;
  let d11;
  let u1;
  let s1;
  let s2;
  let s3;
  let s4;
  let s5;
  let s6;
  let s7;
  let s8;
  let s9;
  let c1;
  let l;
  let cl;

  db.sequelize.sync({ force: true })
    .then(() => {
      // setup company
      return db.Company.create({
        name: 'Taylor & Hart',
        country: 'United Kingdom',
      });
    })
    .then(r => {
      c1 = r;
      // setup location
      return db.Location.create({
        name: 'ACCA',
        country: 'HK',
      });
    })
    .then(r => {
      l = r;
      return db.Location.create({
        name: 'T&H London',
        country: 'United Kingdom',
      });
    })
    .then(r => {
      cl = r;
      // setup suppliers
      return db.Supplier.create({
        name: 'Lakhi',
      });
    })
    .then(r => {
      s1 = r;
      return db.Supplier.create({
        name: 'Monarch',
      });
    })
    .then(r => {
      s2 = r;
      return db.Supplier.create({
        name: 'Rays',
      });
    })
    .then(r => {
      s3 = r;
      return db.Supplier.create({
        name: 'Panache',
      });
    })
    .then(r => {
      s4 = r;
      return db.Supplier.create({
        name: 'Shairu',
      });
    })
    .then(r => {
      s5 = r;
      return db.Supplier.create({
        name: 'Joyt',
      });
    })
    .then(r => {
      s6 = r;
      return db.Supplier.create({
        name: 'Laxmi',
      });
    })
    .then(r => {
      s7 = r;
      return db.Supplier.create({
        name: 'Starrays',
      });
    })
    .then(r => {
      s8 = r;
      return db.Supplier.create({
        name: 'Sierra Jewellery',
      });
    })
    .then(r => {
      s9 = r;
      // setup diamonds
      return db.Diamond.create({
        certificateNumber: '7256033263',
        shape: 'Round',
      });
    })
    .then(r => {
      d1 = r;
      return d1.setSuppliers([s1.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '2266122653',
        shape: 'Round',
      });
    })
    .then(r => {
      d2 = r;
      return d2.setSuppliers([s1.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '6251549066',
        shape: 'Ps',
      });
    })
    .then(r => {
      d3 = r;
      return d3.setSuppliers([s2.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '6252769282',
        shape: 'Emerald',
      });
    })
    .then(r => {
      d4 = r;
      return d4.setSuppliers([s3.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '6271011803',
        shape: 'Round',
      });
    })
    .then(r => {
      d5 = r;
      return d5.setSuppliers([s4.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '6275145454',
        shape: 'Round',
      });
    })
    .then(r => {
      d6 = r;
      return d6.setSuppliers([s5.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '5206984376',
        shape: 'Princess',
      });
    })
    .then(r => {
      d7 = r;
      return d7.setSuppliers([s6.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '2266435665',
        shape: 'Round',
      });
    })
    .then(r => {
      d8 = r;
      return d8.setSuppliers([s7.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '2266222756',
        shape: 'Round',
      });
    })
    .then(r => {
      d9 = r;
      return d9.setSuppliers([s5.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '2185729928',
        shape: 'Oval',
      });
    })
    .then(r => {
      d10 = r;
      return d10.setSuppliers([s8.id]);
    })
    .then(() => {
      return db.Diamond.create({
        certificateNumber: '2254685885',
        shape: 'Round',
      });
    })
    .then(r => {
      d11 = r;
      return d11.setSuppliers([s9.id]);
    })
    .then(() => {
      return db.User.create({
        email: 'dave@taylorandhart.com',
        password: '$2a$12$7f9OT6IpPie1xBNhcjseteDqsUccNncxzqXE28WJ2LwKDPpEdvSlu', // test
        accessToken: 'ac0bd78b4078c2e96c338ec5e091544e5f42faa0',
        role: 'customer',
      });
    })
    .then(r => {
      u1 = r;
      return createOrder(o1, oi1, d1, '', l, cl, u1, c1);
    })
    .then(() => createOrder(o2, oi2, d2, '', l, cl, u1, c1))
    .then(() => createOrder(o3, oi3, d3, '', l, cl, u1, c1))
    .then(() => createOrder(o4, oi4, d4, '', l, cl, u1, c1))
    .then(() => createOrder(o5, oi5, d5, '', l, cl, u1, c1))
    .then(() => createOrder(o6, oi6, d6, '', l, cl, u1, c1))
    // .then(() => createOrder(o7, oi7, d7, '', l, cl, u1, c1))
    .then(() => createOrder(o8, oi8, d8, '', l, cl, u1, c1))
    .then(() => createOrder(o9, oi9, d9, '', l, cl, u1, c1))
    .then(() => createOrder(o10, oi10, d10, '', l, cl, u1, c1))
    .then(() => createOrder(o11, oi11, d11, '', l, cl, u1, c1));
    // setup orders
    // create user login for th
};

module.exports = {
  run,
};

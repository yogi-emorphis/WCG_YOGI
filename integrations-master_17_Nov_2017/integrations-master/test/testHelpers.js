/** Function to help flush the database. */

const db = require('../app/models/index').db();
const moment = require('moment');

const flushDatabase = function () {
  return Promise.all(db.modelNames.map(modelName =>
    db[modelName].destroy({ where: {}, truncate: true })))
    .then(() => db.sequelize.close())
    .catch(error => error);
};

const syncDatabase = function () {
  return db.sequelize.sync({ force: true });
};

const sampleDiamond = function () {
  return db.Diamond.create({
    supplierStockId: 'AH3323',
    shape: 'ROUND',
    carats: 0.33,
    clarity: 'IF',
    cut: '3EX',
    polish: 'EX',
    symmetry: 'EX',
    flouresenceIntensity: 'NON',
    flouresenceColor: 'Blue',
    length: 4.46,
    width: 4.43,
    depth: 2.75,
    depthPercentage: 61.9,
    color: 'D',
    colorShade: 'WHITE',
    rapaportRate: 4000,
    rapaportValue: 1320.00,
    rapaportDiscount: -38.12,
    rateWithDiscount: 2475.2,
    valueWithDiscount: 816.82,
    lab: 'GIA',
    certificateNumber: '6265874440',
    eyeClean: 'YES',
    girdleCondition: 'FACETED',
    crownNatts: '-',
    pavilionHeight: 43.5,
    pavilionAngle: 41.2,
    location: 'India',
    keyToSymbols: 'MINOR DETAILS OF POLISH',
    table: 60,
    tableInclusion: '-',
    tableNatts: '-',
    image: 'http://www.sunrisediamonds.com.hk/img/BIX-206525/PR.jpg',
    v360: 'http://www.brainwaves.co.in/ClientVideo/viewhdimage.html?stoneid=13424258',
    status: 'Available',
  });
};

const sampleLocation = function () {
  return db.Location.create({
    status: 1,
    name: 'Jeweller Office',
    address1: '13 Lingard House',
    address2: 'Marshfield Street',
    city: 'London',
    state: 'Greater London',
    country: 'United Kingdom',
    phone: '+31621839054',
  });
};

const sampleSupplier = function () {
  return db.Supplier.create({
    name: 'Test Supplier',
  });
};

const sampleOrder = function () {
  return db.Order.create({
    orderDate: moment('2017-11-09').toDate(),
    serviceFee: 25,
    status: 1,
    invoiceNumber: '2017-0001',
  });
};

const sampleUser = function (role = 'customer') {
  let user;
  return db.User.create({
    email: 'andre.woons@gmail.com',
    password: '$2a$12$7f9OT6IpPie1xBNhcjseteDqsUccNncxzqXE28WJ2LwKDPpEdvSlu', // test
    accessToken: 'ac0bd78b4078c2e96c338ec5e091544e5f42faa0',
    role,
  }).then(r => {
    user = r;
    return Promise.resolve({ user, token: 'G5LIHKdJQ7IgGLJdmJlPnI7oaIJYGHcjoIdXKHJIIGLJJKigSNLHRLLOIzJUKHNc0VXJKHmPKGpMGPKGcVH4KJ4SHKhHiKcrqIHPIJJZWOLHL5I4HX6dj6wKHnLhW8JkKQNxbGTXTMPHKJ0hbKtUHIj2J3JGk9JGI9eH8tK5KKQI8K9GKIIdHJJHGHMKJHis8K766KGKH6KvHnHIKHGGJISLM35KdjRGtHIHUXLz9IevRI8OGJII2IOo5JGX4IGJ' });
  });
};

const sampleCompany = function () {
  return db.Company.create({
    name: 'Taylor Hart',
    status: 1,
    address1: 'Eerste Atjehstraat 69H',
    city: 'Amsterdam',
    postalCode: '1094 KC',
    country: 'Netherlands',
    phone1: '+31621839054',
    website: 'https://amsterdam.nl',
  });
};

const sampleOrderItem = function () {
  return db.OrderItem.create({
    confirmationStatus: 'confirmed',
    askingPercentage: -38.12,
    askingPrice: 816.82,
    buyingPrice: 816.82,
    customerDiscount: 0,
    customerDiscountPercentage: 0,
    wdcDiscount: 0,
    wdcDiscountPercentage: 0,
    localInsuranceCost: 3,
    landingFee: 25,
    shippingCost: 50,
    localShippingCost: 0,
    GpbConversionRate: 1.3067,
    GpbPrice: 566.30,
    GpbVAT: 113.26,
    GpbTotal: 679.56,
    endCustomerName: 'Louise Roper',
    customerOrderNumber: '112345',
    deliveryDeadline: moment('2017-11-20').toDate(),
    deliveryStatus: 'in transit',
    collectedDate: moment('2017-11-09').toDate(),
    transitDate: moment('2017-11-10').toDate(),
  });
};

const samplePayment = function () {
  return db.Payment.create({
    amountOpen: 0,
    amount: 1400,
    status: 'paid',
    type: 'incoming',
  });
};

const sampleOrderComplete = function () {
  let diamond;
  let location;
  let company;
  let order;
  let orderItem;
  let payment;
  let user;
  let token;
  let supplier;

  return sampleDiamond()
    .then(result => {
      diamond = result;
      return sampleLocation();
    })
    .then(result => {
      location = result;
      return sampleCompany();
    })
    .then(result => {
      company = result;
      return sampleSupplier();
    })
    .then(result => {
      supplier = result;
      return sampleOrder();
    })
    .then(result => {
      order = result;
      return sampleOrderItem();
    })
    .then(result => {
      orderItem = result;
      return samplePayment();
    })
    .then(result => {
      payment = result;
      return sampleUser('customer');
    })
    .then(result => {
      ({ user, token } = result);
      // diamond belongs to supplier
      return diamond.setSuppliers([supplier.id]);
    })
    // location belongs to company
    .then(() => location.setCompany(company.id))
    // orderItem hasOne diamond hasOne location
    .then(() => orderItem.setDiamond(diamond.id))
    .then(() => orderItem.setLocation(location.id))
    // payment belongsTo order belongsTo user
    .then(() => payment.setOrder(order.id))
    .then(() => payment.setUser(user.id))
    // order hasMany payment belongsTo user hasMany orderItem
    .then(() => order.setUser(user.id))
    .then(() => order.setPayments([payment.id]))
    .then(() => order.setOrderItems([orderItem.id]))
    // company hasMany location
    .then(() => company.setLocations([location.id]))
    .then(() => {
      return {
        diamond,
        company,
        location,
        order,
        orderItem,
        payment,
        user,
        token,
        supplier,
      };
    });
};

module.exports = {
  flushDatabase,
  syncDatabase,
  sampleCompany,
  sampleDiamond,
  sampleLocation,
  sampleOrder,
  sampleOrderComplete,
  sampleOrderItem,
  samplePayment,
  sampleUser,
  sampleSupplier,
};

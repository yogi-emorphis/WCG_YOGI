'use strict';

const _ = require('underscore');

/**
 * Checks if user is owner of an order
 * @param {*} order
 * @param {*} userId
 */
const isUserOwnerOfOrder = function (order, userId) {
  if (!order || !userId) {
    return Promise.reject(new Error('Missing values.'));
  }

  // get user of order
  return order.getUser()
    .then(result => {
      if (!result || result.length === 0 || _.contains(result, userId)) {
        throw new Error('Not allowed.');
      }
      return Promise.resolve(true);
    });
};

/**
 * Get single orderItem
 * @param {*} orderItem
 */
const getOrderItem = function (orderItem) {
  if (!orderItem) {
    return Promise.reject(new Error('Missing values.'));
  }

  let diamond;
  let diamondSupplier;
  let location;

  // getDiamond plain true?
  return orderItem.getDiamond()
    .then(result => {
      diamond = result;
      return diamond.getSuppliers({ plain: true });
    })
    .then(result => {
      diamondSupplier = result;
      return diamond.get({ plain: true });
    })
    .then(result => {
      diamond = result;
      diamond.supplier = diamondSupplier;
      return orderItem.getLocation({ plain: true });
    })
    .then(result => {
      location = result;
      return orderItem.get({ plain: true });
    })
    .then(result => {
      const responseObject = result;
      responseObject.diamond = diamond;
      responseObject.location = location;
      return Promise.resolve(responseObject);
    });
};

/**
 * Gets all order item
 * @param {*} order
 */
const getOrderItems = function (order) {
  if (!order) {
    return Promise.reject(new Error('Missing values.'));
  }

  return order.getOrderItems()
    .then(results => Promise.all(_.map(results, result => getOrderItem(result))));
};

/**
 * Gets the complete order
 * @param {*} order
 * @param {*} userId
 */
const getCompleteOrder = function (order, userId) {
  if (!order || !userId) {
    return Promise.reject(new Error('Missing values.'));
  }

  const responseObject = {
    id: order.id,
    orderDate: order.orderDate,
    status: order.status,
    invoiceNumber: order.invoiceNumber,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    serviceFee: order.serviceFee,
    orderItems: [],
    payments: [],
  };

  return isUserOwnerOfOrder(order, userId)
    .then(() => getOrderItems(order))
    .then(orderItems => {
      responseObject.orderItems = orderItems;
      return order.getPayments({ plain: true });
    })
    .then(payments => {
      responseObject.payments = [payments];
      return Promise.resolve(responseObject);
    });
};

module.exports = {
  isUserOwnerOfOrder,
  getCompleteOrder,
};

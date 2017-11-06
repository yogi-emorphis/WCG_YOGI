const { Diamond, HistoricDiamond } = require('../models/index').db();
const _ = require('underscore');

/**
 * This function saves the diamond to the database if required
 *
 * @param diamond - Object - Object to save to the database
 * @param suppliers - Array - IDs of the suppliers the diamond belongs to
 *
 * @returns Diamond - Instance of Diamond
 */
const saveDiamond = function (diamond, suppliers) {
  if (!diamond || !suppliers) {
    return Promise.reject(new Error('Missing values.'));
  }

  let savedDiamond;

  return Diamond.create(diamond)
    .then(result => {
      savedDiamond = result;
      return savedDiamond.addSuppliers(suppliers);
    })
    .then(() => Diamond.findById(savedDiamond.id))
    .catch(error => {
      console.log('Saving diamond did not work: ', error);
      return Promise.reject(error);
    });
};

/**
 * This function removes the old diamond from the database
 *
 * @param oldDiamond - Instance of the Diamond to be removed
 *
 * @returns null
 */
const removeDiamond = function (oldDiamond) {
  if (!oldDiamond) {
    return Promise.reject(new Error('Missing values.'));
  }

  return oldDiamond.destroy();
};


/**
 * This function moves a diamond to the historic table
 *
 * @param diamond - Object - Object of the diamond to be saved
 * @param existingDiamond - Instance of the diamond that we need to move
 * @param supplierId - Int - ID of the supplier the diamonds belong to
 *
 * @return Diamond - Instance of the newly saved Diamond
 */
const moveToHistoric = function (diamond, existingDiamond, supplierId) {
  if (!diamond || !existingDiamond || !supplierId) {
    return Promise.reject(new Error('Missing values.'));
  }

  // copy attributes to new obj and delete db specific items
  const copyObj = Object.assign({}, existingDiamond.get({ plain: true }));
  delete copyObj.id;
  delete copyObj.createdAt;
  delete copyObj.updatedAt;
  delete copyObj.SupplierId;

  // get current existing suppliers
  let supplierIds;
  return existingDiamond.getSuppliers({ attributes: ['id'] })
    .then(ids => {
      supplierIds = ids.map(i => i.id);

      // check if the current supplierId is already there,
      if (!(_.contains(supplierIds, supplierId))) {
        supplierIds.push(supplierId);
      }

      // save existingdiamond to historic table
      return HistoricDiamond.create(copyObj);
    })
    .then(result => result.setSuppliers(supplierIds))
    .then(() => removeDiamond(existingDiamond))
    .then(() => saveDiamond(diamond, supplierIds))
    .catch(error => {
      console.log('Saving diamond did not work: ', error);
      return Promise.reject(error);
    });
};

/**
 * This function checks if a diamond can be saved in the database
 *
 * @param diamond - Object - Object of the diamond we need to check
 * @param supplierId - Int - the id of the supplier this diamond belongs to
 *
 * @return Diamond - Instance of the correct diamond (either new or current)
 */
const checkDiamond = function (diamond, supplierId) {
  if (!diamond || !supplierId) {
    return Promise.reject(new Error('Missing values.'));
  }

  if (!diamond.certificateNumber || !diamond.rateWithDiscount || !diamond.location) {
    return Promise.reject(new Error('Missing diamond values.'));
  }

  return Diamond.find({ where: { certificateNumber: diamond.certificateNumber } })
    .then(result => {
      if (!result) {
        return saveDiamond(diamond, supplierId);
      }

      // we have this diamond, compare values
      if (Number(result.rateWithDiscount) === diamond.rateWithDiscount
        && result.location === diamond.location
        && result.status === diamond.status) {
        return Promise.resolve(result);
      }

      // something has changed, so movetohistoric
      return moveToHistoric(diamond, result, supplierId);
    });
};

module.exports = {
  checkDiamond,
  removeDiamond,
  moveToHistoric,
  saveDiamond,
};

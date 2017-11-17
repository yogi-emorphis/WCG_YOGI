/**
 * File to handle different types of API's
 * JSONObject, JSONArray, CSV, Excel
 */

const JSONStream = require('JSONStream');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const APIError = require('./APIError');

/**
 * Function JSONObject
 *
 * @param {JSON} data - complete json data object
 * @param {Int} supplierId - id of the supplier to save the object to
 * @param {Function} mapFunction - function that maps data to an object
 * @param {Function} saveFunction - function that saves the object
 */
const JSONObject = function (data, supplierId, mapFunction, saveFunction) {
  if (!data || !supplierId || !mapFunction || !saveFunction) {
    return Promise.reject(new Error('Missing values.'));
  }

  const transformStream = JSONStream.stringify();
  const outputStream = fs.createWriteStream(path.join(__dirname, `${supplierId}-data.json`));

  // pipe objects to data file
  transformStream.pipe(outputStream);

  // transform each one
  return Promise.resolve()
    .then(() => {
      transformStream.on(
        'end',
        () => {
          console.log(chalk.blue('TRANSFORM serialization complete!'));
          return Promise.resolve();
        }
      );

      data.forEach(transformStream.write);
      transformStream.end();
    })
    .then(() => new Promise((resolve, reject) => {
      const promises = [];
      outputStream.on(
        'finish',
        () => {
          const parseTransformStream = JSONStream.parse('*');
          const parsedInputStream = fs.createReadStream(path.join(__dirname, `${supplierId}-data.json`));
          parsedInputStream.on(
            'error',
            err => {
              console.log(chalk.red('Error parsing! ', err));
              reject(err);
            }
          );

          parsedInputStream.on(
            'end',
            () => {
              console.log(chalk.green('JSONStream parsing complete!'));
              Promise.all(promises).then(() => resolve());
            }
          );

          parsedInputStream.pipe(parseTransformStream)
            .on(
              'data',
              item => {
                promises.push(mapFunction(item)
                  .then(obj => saveFunction(obj, supplierId))
                  .then(() => {
                    console.log(chalk.green('Saved diamond.'));
                    return Promise.resolve();
                  })
                  .catch(() => APIError.saveError(item, supplierId)
                    .then(() => Promise.resolve())));
              }
            );
        }
      );
    }))
    .then(() => {
      console.log(chalk.yellow('Finished Reading stream.'));

      // delete file
      fs.unlinkSync(path.join(__dirname, `${supplierId}-data.json`));

      return Promise.resolve('Finished.');
    });
};

module.exports = {
  JSONObject,
};

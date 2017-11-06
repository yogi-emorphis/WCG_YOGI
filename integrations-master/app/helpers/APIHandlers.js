/**
 * File to handle different types of API's
 * JSONObject, JSONArray, CSV, Excel
 */

const JSONStream = require('JSONStream');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const saveDiamond = require('./saveDiamond');

const JSONObject = function (data, supplierId, mapFunction) {
  if (!data || !supplierId || !mapFunction) {
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
                  .then(obj => saveDiamond.checkDiamond(obj, supplierId))
                  .then(() => console.log(chalk.green('Saved diamond.'))));
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

module.exports = JSONObject;

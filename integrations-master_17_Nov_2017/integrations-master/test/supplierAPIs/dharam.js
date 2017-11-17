/**
 * Tests for the Dharam Diamond API Integration
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const testHelpers = require('../testHelpers');
const { Supplier, Diamond } = require('../../app/models/index').db();
const sampleData = require('../sampleData/dharam');
const dharamApi = require('../../app/supplierAPIs/dharam');

const should = chai.should();
chai.use(chaiHttp);

describe.only('Dharam Diamond API Integration', function () {
  this.timeout(7000);
  let dharam;

  before(done => {
    testHelpers.syncDatabase()
      .then(() => testHelpers.flushDatabase())
      .then(() => Supplier.create({
        name: 'Dharam',
        apiUrl: 'http://www.dharamhk.com/dharamwebapi/api/StockDispApi/getDiamondData',
      }))
      .then(supplier => {
        dharam = supplier;
        done();
      });
  });

  it('should map the values of the API correctly to the database', done => {
    const d = sampleData.DataList[0];
    dharamApi.mapDharamFields(d)
      .then(result => {
        result.supplierStockId.should.equal(d.Ref);
        result.shape.should.equal(d.Shape);
        result.carats.should.equal(d.Size);
        result.clarity.should.equal(d.Clarity);
        result.cut.should.equal(d.Cut);
        result.polish.should.equal(d.Polish);
        result.symmetry.should.equal(d.Sym);
        result.flouresenceIntensity.should.equal(d.Flour);
        result.depth.should.equal(d.Depth);
        result.color.should.equal(d.Color);
        result.rapaportRate.should.equal(d.RapRate);
        // result.rapaportValue.should.equal(d.RapRate * d.Size);
        // result.rapaportDiscount.should.equal(d.Disc);
        // result.rateWithDiscount.should.equal(d['Price/Carat']);
        // result.valueWithDiscount.should.equal(d.Rate);
        // result.lab.should.equal(d.Cert);
        // result.certificateNumber.should.equal(d.CertNo);
        // result.girdle.should.equal(d.Girdle);
        // result.girdleCondition.should.equal(d.GirdleCondition);
        // result.lowerGirdle.should.equal(d.LowerHalf);
        // result.pavilionDepth.should.equal(d.PavDepth);
        // result.pavilionAngle.should.equal(d.PavAngle);
        // result.location.should.equal(d.Location);
        // result.table.should.equal(d.Table);
        // result.tableNatts.should.equal(d.Natts);
        // result.tableInclusion.should.equal(d.TableInclusion);
        // result.starLength.should.equal(Number(d.StarLength));
        // result.eyeClean.should.equal(d.EyeClean);
        // result.brown.should.equal(d.Browness);
        // result.milky.should.equal(d.Milky);
        // result.comments.should.equal(d.comment);
        // result.laserInscription.should.equal(d.LaserInscription.toString());
        // result.certificateLink.should.equal(d.CertPDFURL);
        // result.status.should.equal(d.Status);
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  it('should correctly source the image to the database', done => {
    const d = sampleData.DataList[1];
    dharamApi.mapDharamFields(d)
      .then(result => {
        result.image.should.equal(d.ImageURL);
        done();
      });
  });

  it('should correctly source the video (if available) to the database', done => {
    const d = sampleData.DataList[2];
    dharamApi.mapDharamFields(d)
      .then(result => {
        result.v360.should.equal(d.VideoURL);
        done();
      });
  });

  it('should check if we have all data when handling response', done => {
    dharamApi.handleResponse()
      .then(() => console.log('shouldnt work'))
      .catch(error => {
        error.message.should.equal('Missing values.');
        done();
      });
  });

  it('should correctly create 3 diamonds from sample data', done => {
    dharamApi.handleResponse(sampleData, dharam.id)
      .then(() => Diamond.findAll())
      .then(results => {
        results.should.have.length(3);
        done();
      });
  });

  after(done => {
    testHelpers.flushDatabase()
      .then(() => done());
  });
});

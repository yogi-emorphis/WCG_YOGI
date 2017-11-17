/**
 * Tests for the Dharam Diamond API Integration
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const testHelpers = require('../testHelpers');
const { Supplier, Diamond } = require('../../app/models/index').db();
const sampleData = require('../sampleData/glowstar');
const glowstarApi = require('../../app/supplierAPIs/glowstar');

const should = chai.should();
chai.use(chaiHttp);

describe.only('Glowstar Diamond API Integration', function () {
  this.timeout(7000);
  let dharam;

  before(done => {
    testHelpers.syncDatabase()
      .then(() => testHelpers.flushDatabase())
      .then(() => Supplier.create({
        name: 'Glowstar',
        apiUrl: 'https://www.glowstaronline.com/inventory/website/TaylorNhart.php',
      }))
      .then(supplier => {
        dharam = supplier;
        done();
      });
  });

  it('should map the values of the API correctly to the database', done => {
    const d = sampleData.PKTDTL[0];
    glowstarApi.mapGlowstarFields(d)
      .then(result => {
        result.supplierStockId.should.equal(d.Loat_NO);
        result.shape.should.equal(d.Shape);
        result.clarity.should.equal(d.Clarity);
        result.cut.should.equal(d.Cut);
        result.polish.should.equal(d.Polish);
        result.symmetry.should.equal(d.Symmetry);
        result.flouresenceIntensity.should.equal(d.Fluorescence);
        result.depth.should.equal(d.Depth);
        result.color.should.equal(d.Color);
        result.rapaportRate.should.equal(d.Rap);
        result.rapaportValue.should.equal(d.Rap * d.Dcarat);
        result.rapaportDiscount.should.equal(d.Dcaret);
        result.rateWithDiscount.should.equal(d.Dcaret);
        result.valueWithDiscount.should.equal(d.NetDollar);
        result.lab.should.equal(d.Lab);
        result.certificateNumber.should.equal(d.CertiNo);
        result.girdle.should.equal(d.Girdle);
        result.girdleCondition.should.equal(d['Girdle Condition']);
        result.lowerGirdle.should.equal(d['Girdle%']);
        result.pavilionDepth.should.equal(d['pav Depth']);
        result.pavilionAngle.should.equal(d['pav Angle']);
        result.location.should.equal(d.Location);
        result.table.should.equal(d.Table);
        result.tableNatts.should.equal(d.Natts);
        result.starLength.should.equal(d.Length);
        result.eyeClean.should.equal(d.EyeClean);
        result.certificateLink.should.equal(d['VIDEO_URL']);
        result.status.should.equal(d.Status);
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });

  it('should correctly source the image to the database', done => {
    const d = sampleData.PKTDTL[1];
    glowstarApi.mapGlowstarFields(d)
      .then(result => {
        result.image.should.equal(d['DIAMONDIMG_URL']);
        done();
      });
  });

  it('should correctly source the video (if available) to the database', done => {
    const d = sampleData.PKTDTL[2];
    glowstarApi.mapGlowstarFields(d)
      .then(result => {
        result.v360.should.equal(d['VIDEO_URL']);
        done();
      });
  });

  it('should check if we have all data when handling response', done => {
    glowstarApi.handleResponse()
      .then(() => console.log('shouldnt work'))
      .catch(error => {
        error.message.should.equal('Missing values.**********************************'); 
        done();
      });
  });

  it('should correctly create 3 diamonds from sample data', done => {
    glowstarApi.handleResponse(sampleData, dharam.id)
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


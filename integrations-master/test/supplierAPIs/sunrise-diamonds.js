/**
 * Tests for the Sunrise Diamond API Integration
 */
 var fs = require("fs");

const chai = require('chai');
const chaiHttp = require('chai-http');
const ping = require('ping');
const server = require('../../app');
const testHelpers = require('../testHelpers');
const { Supplier, Diamond } = require('../../app/models/index').db();
const sampleData = require('../sampleData/sunrise-diamonds');
const sunriseDiamonds = require('../../app/supplierAPIs/sunrise-diamonds');
const sunriseapifile = require('../../sunriseapi');
const should = chai.should();
chai.use(chaiHttp);

describe('Sunrise Diamond API Integration', function () {
  this.timeout(7000);
  let sunrise;

  before(done => {
    testHelpers.syncDatabase()
      .then(() => testHelpers.flushDatabase())
      .then(() => Supplier.create({
        name: 'Sunrise Diamond',
        apiUrl: 'http://www.sunrisediamonds.com.hk/inventory/Wgc.json',
        //apiUrl: 'https://www.glowstaronline.com/inventory/website/TaylorNhart.php',
      }))
      .then(supplier => {
        sunrise = supplier;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+JSON.stringify(supplier));
       
        done();
      }).then({


      });
  });

it('API Call for Sunrise', done => {
   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
   sunriseapi();

});

  it('the domain name should be online', done => {
    ping.promise.probe('sunrisediamonds.com.hk')
      .then(res => {
        res.alive.should.equal(true);
        done();
      });
  });

  it('should map the values of the API correctly to the database', done => {
    const d = sampleData[0];
    sunriseDiamonds.mapSunriseFields(d)
      .then(result => {
        result.supplierStockId.should.equal(d['Ref. No']);
        result.shape.should.equal(d.Shape);
        result.carats.should.equal(d.Cts);
        result.clarity.should.equal(d.Clarity);
        result.cut.should.equal(d.Cut);
        result.polish.should.equal(d.Polish);
        result.symmetry.should.equal(d.Symm);
        result.flouresenceIntensity.should.equal(d.Fls);
        result.length.should.equal(d.Length);
        result.width.should.equal(d.Width);
        result.depth.should.equal(d.Depth);
        result.color.should.equal(d.Color);
        result.colorShade.should.equal(d.Shade);
        result.rapaportRate.should.equal(d['Rap Price($)']);
        result.rapaportValue.should.equal(d['Rap Amt($)']);
        result.rapaportDiscount.should.equal(d['Disc(%)']);
        result.rateWithDiscount.should.equal((d['Rap Price($)'] - (d['Rap Price($)'] * (d['Disc(%)'] / 100))));
        result.valueWithDiscount.should.equal(d['Net Amt($)']);
        result.lab.should.equal(d.Lab);
        result.certificateNumber.should.equal(d['Certi No.']);
        result.girdle.should.equal(d['Girdle Type']);
        result.crownHeight.should.equal(d['Cr Ht']);
        result.crownAngle.should.equal(d['Cr Ang']);
        result.pavilionHeight.should.equal(d['Pav Ht']);
        result.pavilionAngle.should.equal(d['Pav Ang']);
        result.keyToSymbols.should.equal(d['Key To Symbol']);
        result.table.should.equal(d['Table(%)']);
        result.tableInclusion.should.equal(d['Table Inclusion']);
        done();
      });
  });

  it('should correctly source the image to the database', done => {
    const d = sampleData[1];
    const refNo = d['Ref. No'];
    sunriseDiamonds.mapSunriseFields(d)
      .then(result => {
        result.image.should.equal(`http://www.sunrisediamonds.com.hk/img/${refNo}/PR.jpg`);
        done();
      });
  });

  it('should correctly source the video (if available) to the database', done => {
    const d = sampleData[2];
    sunriseDiamonds.mapSunriseFields(d)
      .then(result => {
        result.v360.should.equal(d['Other Video']);
        done();
      });
  });

  it('should check if we have all data when handling response', done => {
    sunriseDiamonds.handleResponse()
      .then(() => console.log('shouldnt work'))
      .catch(error => {
        error.message.should.equal('Missing values.');
        done();
      });
  });

  it('should correctly create 3 diamonds from sample data', done => {
    sunriseDiamonds.handleResponse(sampleData, sunrise.id)
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

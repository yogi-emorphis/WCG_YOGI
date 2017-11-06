/**
 * Save Diamond Helper Test
 */
const chai = require('chai');
const testHelpers = require('../testHelpers');
const saveDiamond = require('../../app/helpers/saveDiamond');
const { Supplier, Diamond, HistoricDiamond } = require('../../app/models/index').db();

const should = chai.should();

describe('Save Diamond Helper Test', () => {
  let testSupplier;
  let secondSupplier;
  let thirdSupplier;

  let diamond;

  const diamondObj = {
    supplierStockId: 'vvs210',
    shape: 'Yogi',
    carats: 0.5,
    clarity: 'clarity',
    cut: 'cut',
    polish: 'polish',
    symmetry: 'symmetry',
    flouresenceIntensity: 'flouresenceIntensity',
    flouresenceColor: 'flouresenceColor',
    length: 1.0,
    width: 1.01,
    depth: 100,
    depthPercentage: 50,
    color: 'color',
    colorShade: 'colorShade',
    rapaportRate: 1000,
    rapaportValue: 500,
    rapaportDiscount: -10,
    rateWithDiscount: 900.5,
    valueWithDiscount: 450,
    lab: 'lab',
    certificateNumber: '50',
    eyeClean: 'eyeClean',
    girdle: 'girdle',
    girdlePercent: 0.01,
    girdleCondition: 'girdleCondition',
    culetSize: 'culetSize',
    crownHeight: 100,
    crownAngle: 90,
    crownNatts: 10,
    pavilionHeight: 10,
    pavilionDepth: 30,
    pavilionAngle: 20,
    laserInscription: 'laserInscription',
    comments: 'comments',
    starLength: 3,
    location: 'location',
    keyToSymbols: 'keyToSymbols',
    blackInCentre: 'blackInCentre',
    blackInSide: 'blackInSide',
    whiteInCentre: 'whiteInCentre',
    whiteInSide: 'whiteInSide',
    table: 33,
    tableInclusion: 'tableInclusion',
    tableNatts: 'NONE',
    image: 'image',
    segoma: 'segoma',
    v360: 'v360',
    certificateLink: 'certificateLink',
    lowerGirdle: 'lowerGirdle',
    inclusionType: 'inclusionType',
    pairs: 'pairs',
    pairsRef: 'pairsRef',
    fancyIntensity: 'fancyIntensity',
    fancyColor: 'fancyColor',
    status: 'status',
  };

  before(done => {
    testHelpers.syncDatabase()
      .then(() => testHelpers.flushDatabase())
      .then(() => Supplier.create({
        name: 'Test Supplier',
      }))
      .then(supplier => {
        testSupplier = supplier;
        return Supplier.create({
          name: 'Second Supplier',
        });
      })
      .then(supplier => {
        secondSupplier = supplier;
        return Supplier.create({
          name: 'Third Supplier',
        });
      })
      .then(supplier => {
        thirdSupplier = supplier;
        done();
      });
  });

  describe('save diamond function', () => {
    it('should check if we have all values', done => {
      saveDiamond.saveDiamond()
        .then(() => console.log('should not work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    it('should save the diamond', done => {
      saveDiamond.saveDiamond(diamondObj, [testSupplier.id, secondSupplier.id])
        .then(result => {
          diamond = result;
          diamond.supplierStockId.should.equal('vvs210');
          diamond.shape.should.equal('Yogi');
          diamond.carats.should.equal('0.5');
          diamond.clarity.should.equal('clarity');
          diamond.cut.should.equal('cut');
          diamond.polish.should.equal('polish');
          diamond.symmetry.should.equal('symmetry');
          diamond.flouresenceIntensity.should.equal('flouresenceIntensity');
          diamond.flouresenceColor.should.equal('flouresenceColor');
          diamond.length.should.equal('1');
          diamond.width.should.equal('1.01');
          diamond.depth.should.equal('100');
          diamond.depthPercentage.should.equal('50');
          diamond.color.should.equal('color');
          diamond.colorShade.should.equal('colorShade');
          diamond.rapaportRate.should.equal('1000');
          diamond.rapaportValue.should.equal('500');
          diamond.rapaportDiscount.should.equal('-10');
          diamond.rateWithDiscount.should.equal('900.5');
          diamond.valueWithDiscount.should.equal('450');
          diamond.lab.should.equal('lab');
          diamond.certificateNumber.should.equal('50');
          diamond.eyeClean.should.equal('eyeClean');
          diamond.girdle.should.equal('girdle');
          diamond.girdlePercent.should.equal('0.01');
          diamond.girdleCondition.should.equal('girdleCondition');
          diamond.culetSize.should.equal('culetSize');
          diamond.crownHeight.should.equal('100');
          diamond.crownAngle.should.equal('90');
          diamond.crownNatts.should.equal('10');
          diamond.pavilionHeight.should.equal('10');
          diamond.pavilionDepth.should.equal('30');
          diamond.pavilionAngle.should.equal('20');
          diamond.laserInscription.should.equal('laserInscription');
          diamond.comments.should.equal('comments');
          diamond.starLength.should.equal(3);
          diamond.location.should.equal('location');
          diamond.keyToSymbols.should.equal('keyToSymbols');
          diamond.blackInCentre.should.equal('blackInCentre');
          diamond.blackInSide.should.equal('blackInSide');
          diamond.whiteInCentre.should.equal('whiteInCentre');
          diamond.whiteInSide.should.equal('whiteInSide');
          diamond.table.should.equal('33');
          diamond.tableInclusion.should.equal('tableInclusion');
          diamond.tableNatts.should.equal('NONE');
          diamond.image.should.equal('image');
          diamond.segoma.should.equal('segoma');
          diamond.v360.should.equal('v360');
          diamond.certificateLink.should.equal('certificateLink');
          diamond.lowerGirdle.should.equal('lowerGirdle');
          diamond.inclusionType.should.equal('inclusionType');
          diamond.pairs.should.equal('pairs');
          diamond.pairsRef.should.equal('pairsRef');
          diamond.fancyIntensity.should.equal('fancyIntensity');
          diamond.fancyColor.should.equal('fancyColor');
          diamond.status.should.equal('status');
          done();
        });
    });

    it('should attach the diamond to both suppliers', done => {
      Diamond.find({ where: { id: diamond.id }, include: [Supplier] })
        .then(result => {
          result.should.have.length(1);
          result.Suppliers.should.have.length(2);
          result.Suppliers[0].id.should.equal(testSupplier.id);
          result.Suppliers[1].id.should.equal(secondSupplier.id);
          done();
        });
    });

    it('should be able to retrieve the diamond from the suppliers', done => {
      Supplier.find({ where: { id: testSupplier.id }, include: [Diamond] })
        .then(result => {
          result.Diamonds.should.have.length(1);
          result.Diamonds[0].id.should.equal(diamond.id);
          return Supplier.find({ where: { id: secondSupplier.id }, include: [Diamond] });
        }).then(result => {
          result.Diamonds.should.have.length(1);
          result.Diamonds[0].id.should.equal(diamond.id);
          done();
        });
    });
  });

  describe('remove diamond function', () => {
    let removingDiamond = Object.assign({}, diamondObj);
    removingDiamond.location = 'to be removed';

    before(done => {
      Diamond.create(removingDiamond)
        .then(result => {
          removingDiamond = result;
          return result.addSuppliers(testSupplier.id);
        })
        .then(() => done());
    });

    it('should check if we have all values', done => {
      saveDiamond.removeDiamond()
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    it('should remove the diamond from the database', done => {
      saveDiamond.removeDiamond(removingDiamond)
        .then(() => Diamond.find({ where: { location: 'to be removed' } }))
        .then(results => {
          should.equal(results, null);
          done();
        });
    });

    it('should remove the link from the suppliers', done => {
      Supplier.find({ where: { id: testSupplier.id }, include: [Diamond] })
        .then(result => {
          result.Diamonds.should.have.length(1);
          return Supplier.find({ where: { id: secondSupplier.id }, include: [Diamond] });
        })
        .then(result => {
          result.Diamonds.should.have.length(1);
          done();
        });
    });
  });

  describe('move to historic function', () => {
    let newDiamond = Object.assign({}, diamondObj);
    newDiamond.location = 'Hong Kong';

    it('should check if we have all values', done => {
      saveDiamond.moveToHistoric()
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    it('should move the old diamond to historic and return the new diamond', done => {
      saveDiamond.moveToHistoric(newDiamond, diamond, thirdSupplier.id)
        .then(result => {
          newDiamond = result;
          newDiamond.location.should.equal('Hong Kong');
          done();
        });
    });

    it('should add the relationship to the existing suppliers', done => {
      Diamond.find({ where: { id: newDiamond.id }, include: [Supplier] })
        .then(result => {
          result.should.have.length(1);
          result.Suppliers.should.have.length(3); // 3 because of test underneath this one
          result.Suppliers[0].name.should.equal('Test Supplier');
          result.Suppliers[1].name.should.equal('Second Supplier');
          done();
        });
    });

    it('should also create a new relationship if it doesnt exist already', done => {
      Supplier.find({ where: { id: thirdSupplier.id }, include: [Diamond] })
        .then(result => {
          result.Diamonds.should.have.length(1);
          result.Diamonds[0].location.should.equal('Hong Kong');
          done();
        });
    });

    it('suppliers should have a new historic', done => {
      Supplier.find({ where: { id: testSupplier.id }, include: [HistoricDiamond] })
        .then(result => {
          result.HistoricDiamonds[0].location.should.equal('location');
          return Supplier.find({ where: { id: secondSupplier.id }, include: [HistoricDiamond] });
        })
        .then(result => {
          result.HistoricDiamonds[0].location.should.equal('location');
          done();
        });
    });

    it('new historic should have suppliers', done => {
      HistoricDiamond.findAll({ where: {}, include: [Supplier] })
        .then(results => {
          results.should.have.length(1);
          results[0].Suppliers[0].name.should.equal('Test Supplier');
          results[0].Suppliers[1].name.should.equal('Second Supplier');
          done();
        });
    });

    it('suppliers should only have the new diamond', done => {
      Supplier.find({ where: { id: testSupplier.id }, include: [Diamond] })
        .then(result => {
          result.Diamonds.should.have.length(1);
          return Supplier.find({ where: { id: secondSupplier.id }, include: [Diamond] });
        })
        .then(result => {
          result.Diamonds.should.have.length(1);
          done();
        });
    });
  });

  describe('check diamond function', () => {
    let finalDiamond;

    it('should check if were sending diamond and supplier', done => {
      saveDiamond.checkDiamond()
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Missing values.');
          done();
        });
    });

    it('should check if diamond has all the right values', done => {
      const testDiamond = { id: 1, location: 'test', certificateNumber: '1' };
      saveDiamond.checkDiamond(testDiamond, testSupplier.id)
        .then(() => console.log('shouldnt work'))
        .catch(error => {
          error.message.should.equal('Missing diamond values.');
          done();
        });
    });

    it('should return a new one if it didnt exist before', done => {
      Diamond.destroy({ where: {} })
        .then(() => saveDiamond.checkDiamond(diamondObj, testSupplier.id))
        .then(result => {
          finalDiamond = result;
          finalDiamond.location.should.equal(diamondObj.location);
          done();
        });
    });

    it('should return the existing diamond if nothings changed', done => {
      saveDiamond.checkDiamond(diamondObj, testSupplier.id)
        .then(result => {
          result.id.should.equal(finalDiamond.id);
          done();
        });
    });

    it('should return a new one if the rate has changed', done => {
      diamondObj.rateWithDiscount = 736.53;
      saveDiamond.checkDiamond(diamondObj, thirdSupplier.id)
        .then(result => {
          result.id.should.not.equal(finalDiamond.id);
          result.rateWithDiscount.should.equal('736.53');
          finalDiamond = result;
          done();
        });
    });

    it('should return a new one if the availability has changed', done => {
      diamondObj.status = 'sold out';
      saveDiamond.checkDiamond(diamondObj, secondSupplier.id)
        .then(result => {
          result.id.should.not.equal(finalDiamond.id);
          result.rateWithDiscount.should.equal('736.53');
          result.status.should.equal('sold out');
          finalDiamond = result;
          done();
        });
    });

    it('should return a new one if the location has changed', done => {
      diamondObj.location = 'london';
      saveDiamond.checkDiamond(diamondObj, testSupplier.id)
        .then(result => {
          result.id.should.not.equal(finalDiamond.id);
          result.rateWithDiscount.should.equal('736.53');
          result.status.should.equal('sold out');
          result.location.should.equal('london');
          finalDiamond = result;
          done();
        });
    });
  });

  after(done => {
    testHelpers.flushDatabase()
      .then(() => done());
  });
});

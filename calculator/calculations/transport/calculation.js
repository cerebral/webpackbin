'use strict';
const commonUtils = require('../../../utils/common');
const constants = require('../../constants/transport.json');
const getDefaultTransportWorkFreq = require('./getDefaultTransportWorkFreq');
const getDefaultTransportSocialKm = require('./getDefaultTransportSocialKm');
const getVehicles = require('./getVehicles');

module.exports = (input) => {
  const distanceWork = input.transport.distanceWork || 10;
  const vehicles = getVehicles(input);
  const workFreq = input.transport.workFrequency ? input.transport.workFrequency : getDefaultTransportWorkFreq(input);
  const socialKm = input.transport.socialKm ? input.transport.socialKm : getDefaultTransportSocialKm(input);
  const publicTrips = input.transport.publicTrips || {
    regional: 2,
    scandinavia: 0,
    europe: 0
  };
  const flightTrips = input.transport.flightTrips || {
    scandinavia: 1,
    europe: 2,
    global: 0
  };
  const boatTrips = input.transport.boatTrips || 0;
  const carTrips = input.transport.carTrips || {
    regional: 4,
    scandinavia: 0,
    europe: 0
  };
  const publicEmissionShort = (
    constants.busEmissionNormal * constants.sharePublicBus +
    constants.trainEmission * constants.sharePublicTrain
  );
  const emissionPublicAverageLong = (
    constants.busEmissionLong * constants.sharePublicBus +
    constants.trainEmission * constants.sharePublicTrain
  );
  const numberOfCarsHousehold = vehicles.electric + vehicles.fossil + vehicles.hybrid;
  const averageEmissionCars = (
    numberOfCarsHousehold === 0 ?
      constants.carEmissionShared :
      (
        vehicles.electric * constants.carEmissionElectric +
        vehicles.hybrid * constants.carEmissionHybrid +
        vehicles.fossil * constants.carEmissionFossil
      ) / numberOfCarsHousehold
  );
  const emissionCoDriveWork = averageEmissionCars / constants.peopleInCarCoDrivingWork;
  const emissionCoDriveSocial = averageEmissionCars / constants.peopleInCarCoDrivingLeisure;
  const co2 = {
    work: {
      work1: commonUtils.toCo2(
        publicEmissionShort *
        distanceWork * constants.weeksWork * workFreq.public * 2
      ),
      work2: commonUtils.toCo2(
        emissionCoDriveWork *
        distanceWork * constants.weeksWork * workFreq.coDrive * 2
      ),
      work3: commonUtils.toCo2(
        constants.carEmissionElectric *
        distanceWork * constants.weeksWork * workFreq.vehicleElectric * 2
      ),
      work4: commonUtils.toCo2(
        constants.carEmissionHybrid *
        distanceWork * constants.weeksWork * workFreq.vehicleHybrid * 2
      ),
      work5: commonUtils.toCo2(
        constants.carEmissionFossil *
        distanceWork * constants.weeksWork * workFreq.vehicleFossil * 2
      ),
      work6: commonUtils.toCo2(
        constants.motorbikeEmission *
        distanceWork * constants.weeksWork * workFreq.vehicleMotorbike * 2
      ),
      work7: commonUtils.toCo2(
        constants.carEmissionShared *
        distanceWork * constants.weeksWork * workFreq.vehicleShared * 2
      )
    },
    social: {
      social1: commonUtils.toCo2(
        publicEmissionShort *
        socialKm.public * constants.weeksLeisure
      ),
      social2: commonUtils.toCo2(
        emissionCoDriveSocial *
        socialKm.coDrive * constants.weeksLeisure
      ),
      social3: commonUtils.toCo2(
        constants.carEmissionElectric *
        socialKm.vehicleElectric * constants.weeksLeisure
      ),
      social4: commonUtils.toCo2(
        constants.carEmissionHybrid *
        socialKm.vehicleHybrid * constants.weeksLeisure
      ),
      social5: commonUtils.toCo2(
        constants.carEmissionFossil *
        socialKm.vehicleFossil * constants.weeksLeisure
      ),
      social6: commonUtils.toCo2(
        constants.motorbikeEmission *
        socialKm.vehicleMotorbike * constants.weeksLeisure
      ),
      social7: commonUtils.toCo2(
        constants.carEmissionShared *
        socialKm.vehicleShared * constants.weeksLeisure
      )
    },
    holiday: {
      holiday1: commonUtils.toCo2(
        emissionPublicAverageLong *
        publicTrips.regional * constants.distanceRegionalOneWay
      ),
      holiday2: commonUtils.toCo2(
        emissionPublicAverageLong *
        publicTrips.scandinavia * constants.distanceScandinaviaOneWay
      ),
      holiday3: commonUtils.toCo2(
        emissionPublicAverageLong *
        publicTrips.europe * constants.distanceEuropeOneWay
      ),
      holiday4: commonUtils.toCo2(
        constants.flightEmissionScandinavia *
        flightTrips.scandinavia * constants.distanceScandinaviaOneWay
      ),
      holiday5: commonUtils.toCo2(
        constants.flightEmissionEurope *
        flightTrips.europe * constants.distanceEuropeOneWay
      ),
      holiday6: commonUtils.toCo2(
        constants.flightEmissionGlobal *
        flightTrips.global * constants.distanceGlobalOneWay
      ),
      holiday7: commonUtils.toCo2(
        (averageEmissionCars / constants.peopleInCarHoliday) *
        carTrips.regional * constants.distanceRegionalOneWay
      ),
      holiday8: commonUtils.toCo2(
        (averageEmissionCars / constants.peopleInCarHoliday) *
        carTrips.scandinavia * constants.distanceScandinaviaOneWay
      ),
      holiday9: commonUtils.toCo2(
        (averageEmissionCars / constants.peopleInCarHoliday) *
        carTrips.europe * constants.distanceEuropeOneWay
      ),
      holiday10: commonUtils.toCo2(
        constants.boatEmissionLong *
        boatTrips * constants.distanceBoatDay
      )
    }
  };

  return {
    work: commonUtils.toCo2(commonUtils.sum(co2.work)),
    social: commonUtils.toCo2(commonUtils.sum(co2.social)),
    holiday: commonUtils.toCo2(commonUtils.sum(co2.holiday))
  };
};

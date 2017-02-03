/* eslint-disable no-nested-ternary */
const commonUtils = require('../../../utils/common');
const getVehicles = require('./getVehicles');

module.exports = (input) => {
  const vehicles = getVehicles(input);
  const adults = input.household.members.adults;
  const workCoDriveFreq = input.transport.workCoDriveFreq || 0;
  const workFreq = {
    vehicleElectric: (
      vehicles.electric > adults ? 5 : (
        vehicles.electric === adults ? 4 : (
          vehicles.electric === 0 ? 0 : 3
        )
      )
    ),
    vehicleHybrid: (
      vehicles.hybrid > adults ? 5 : (
        vehicles.hybrid === adults ? 4 : (
          vehicles.hybrid === 0 ? 0 : 3
        )
      )
    ),
    vehicleFossil: (
      vehicles.fossil > adults ? 5 : (
        vehicles.fossil === adults ? 4 : (
          vehicles.fossil === 0 ? 0 : 3
        )
      )
    ),
    vehicleMotorbike: (
      vehicles.motorbike > adults ? 5 : (
        vehicles.motorbike === adults ? 4 : (
          vehicles.motorbike === 0 ? 0 : 3
        )
      )
    )
  };


  let vehicleDaysWork = commonUtils.sum(workFreq);
  const workFreqKeys = Object.keys(workFreq);
  let currentKeyIndex = 0;

  while (vehicleDaysWork > 5) {
    if (workFreq[workFreqKeys[currentKeyIndex]]) {
      workFreq[workFreqKeys[currentKeyIndex]]--;
      vehicleDaysWork = commonUtils.sum(workFreq);
    }
    currentKeyIndex = currentKeyIndex === workFreqKeys.length - 1 ? 0 : currentKeyIndex + 1;
  }

  const workPublicFreq = 5 - vehicleDaysWork;

  return Object.assign(workFreq, {
    coDrive: workCoDriveFreq,
    public: workPublicFreq,
    vehicleShared: 0
  });
};

/* eslint-disable no-nested-ternary */
const commonUtils = require('../../../utils/common');
const getVehicles = require('./getVehicles');

module.exports = (input) => {
  const adults = input.household.members.adults;
  const socialCoDriveKm = input.transport.transportSocialCoDriveKm || 20;
  const vehicles = getVehicles(input);

  const socialKm = {
    vehicleMotorbike: (
      vehicles.motorbike > adults ? 120 : (
        vehicles.motorbike === adults ? 100 : (
          vehicles.motorbike === 0 ? 0 : 80
        )
      )
    ),
    vehicleFossil: (
      vehicles.fossil > adults ? 120 : (
        vehicles.fossil === adults ? 100 : (
          vehicles.fossil === 0 ? 0 : 80
        )
      )
    ),
    vehicleHybrid: (
      vehicles.hybrid > adults ? 120 : (
        vehicles.hybrid === adults ? 100 : (
          vehicles.hybrid === 0 ? 0 : 80
        )
      )
    ),
    vehicleElectric: (
      vehicles.electric > adults ? 120 : (
        vehicles.electric === adults ? 100 : (
          vehicles.electric === 0 ? 0 : 80
        )
      )
    )
  };

  let totalSocialKm = commonUtils.sum(socialKm);
  const transportSocialKmKeys = Object.keys(socialKm);
  let currentKeyIndex = 0;

  while (totalSocialKm > 120) {
    if (socialKm[transportSocialKmKeys[currentKeyIndex]]) {
      socialKm[transportSocialKmKeys[currentKeyIndex]]--;
      totalSocialKm = commonUtils.sum(socialKm);
    }
    currentKeyIndex = currentKeyIndex === transportSocialKmKeys.length - 1 ? 0 : currentKeyIndex + 1;
  }

  const socialPublicKm = (
    120 -
    socialKm.vehicleElectric -
    socialKm.vehicleHybrid -
    socialKm.vehicleFossil -
    socialKm.vehicleMotorbike
  );

  return Object.assign(socialKm, {
    coDrive: socialCoDriveKm,
    public: socialPublicKm,
    vehicleShared: 0
  });
};

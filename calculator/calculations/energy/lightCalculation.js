const constants = require('../../constants/energy.json');
const energyCorrectionFactorCalculation = require('./energyCorrectionFactorCalculation');

module.exports = (input) => {
  const totalMembers = input.household.members.adults + input.household.members.children;
  const energyCorrectionFactor = energyCorrectionFactorCalculation(input);
  const lightsAveragePersonal = (constants.lightsAverage * energyCorrectionFactor) / totalMembers;

  const energyLightWithoutLed = (
    lightsAveragePersonal /
    (
      constants.ledShareHouseholdAvg * constants.ledEnergyUse +
      (1 - constants.ledShareHouseholdAvg)
    )
  );

  return (
    energyLightWithoutLed *
    (
      (constants[input.energy.ledLights || 'ledLights3'] * constants.ledEnergyUse) +
      (1 - constants[input.energy.ledLights || 'ledLights3'])
    ) *
    constants[input.energy.lightsOff || 'lightsOff3']
  );
};

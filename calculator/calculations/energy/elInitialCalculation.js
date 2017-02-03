const energyCorrectionFactorCalculation = require('./energyCorrectionFactorCalculation');
const constants = require('../../constants/energy.json');

module.exports = function elInitialCalculation(input) {
  const energyCorrectionFactor = energyCorrectionFactorCalculation(input);
  const totalMembers = input.household.members.adults + input.household.members.children;

  return (constants.elAverage * energyCorrectionFactor) / totalMembers;
};

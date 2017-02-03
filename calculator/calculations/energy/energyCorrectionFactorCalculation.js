const constants = require('../../constants/energy.json');

module.exports = function energyCorrectionFactorCalculation(input) {
  const totalMembers = input.household.members.adults + input.household.members.children;

  return totalMembers >= 5 ? constants.energyCorrectionFactors[5] : constants.energyCorrectionFactors[totalMembers];
};

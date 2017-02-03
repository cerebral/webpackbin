const constants = require('../../constants/energy.json');
const energyCorrectionFactorCalculation = require('./energyCorrectionFactorCalculation');
const getSqm = require('./getSqm');
const houseTypeFactors = constants.houseTypes;

module.exports = function totalEnergyCalculation(input) {
  return houseTypeFactors[input.household.type] * getSqm(input) * energyCorrectionFactorCalculation(input);
};

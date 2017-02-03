const constants = require('../../constants/energy.json');
const elInitialCalculation = require('./elInitialCalculation');

module.exports = (input) => {
  const elInitial = elInitialCalculation(input);

  return (
    elInitial * constants.energyShareOther +
    elInitial * constants.energyShareWashing * constants[input.energy.dishWasher || 'dishWasher3'] +
    elInitial * constants.energyShareTumble * constants[input.energy.tumbleDrier || 'tumbleDrier3'] +
    elInitial * constants.energyShareGadget * constants[input.energy.energySaver || 'energySaver3']
  );
};

const constants = require('../../constants/energy.json');

module.exports = (input) => {
  let showerFreq = typeof input.energy.showerFreq === 'undefined' ? 7 : Number(input.energy.showerFreq);
  let showerLength = typeof input.energy.showerLength === 'undefined' ? 8 : Number(input.energy.showerLength);

  if (showerFreq > 14) {
    showerFreq = 14;
  } else if (showerFreq < 1) {
    showerFreq = 1;
  }

  if (showerLength > 20) {
    showerFreq = 20;
  } else if (showerLength < 1) {
    showerLength = 1;
  }

  const energyWaterOther = constants[input.energy.hotWater || 'hotWater3'] * constants.waterHeatingEnergyLiters * 365;
  const energyWaterShower = (
    constants[input.energy.showerType || 'showerType2'] *
    showerFreq *
    showerLength *
    52 *
    constants.waterHeatingEnergyLiters
  );

  return energyWaterOther + energyWaterShower;
};

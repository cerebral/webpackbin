'use strict';
const constants = require('../../constants/energy.json');
const heatRenovateAreaCalculation = require('./heatRenovateAreaCalculation');
const lightCalculation = require('./lightCalculation');
const waterCalculcation = require('./waterCalculcation');
const electronicsCalculcation = require('./electronicsCalculcation');
const totalEnergyCalculation = require('./totalEnergyCalculation');

module.exports = (input) => {
  // Determine heat source. Only one active heat source
  const heatSources = {
    heatSource1: input.energy.heatSource === 'heatSource1' ? constants.heatPump1 : 0,
    heatSource2: input.energy.heatSource === 'heatSource2' ? constants.heatPump2 : 0,
    heatSource3: input.energy.heatSource === 'heatSource3' ? constants.heatPump3 : 0,
    heatSource4: input.energy.heatSource === 'heatSource4' ? 1 : 0,
    heatSource5: input.energy.heatSource === 'heatSource5' || !input.energy.heatSource ? 1 : 0,
    heatSource6: input.energy.heatSource === 'heatSource6' ? 1 : 0,
    heatSource7: input.energy.heatSource === 'heatSource7' ? 1 : 0
  };

  // Prepare result of calculation
  const energyResult = {
    heat: {esld1: 0, esld1_1: 0, esld2: 0, esld3: 0, esld4: 0, esld5: 0},
    water: {esld1: 0, esld1_1: 0, esld2: 0, esld3: 0, esld4: 0, esld5: 0},
    light: {esld1: 0, esld1_1: 0, esld2: 0, esld3: 0, esld4: 0, esld5: 0},
    electronics: {esld1: 0, esld1_1: 0, esld2: 0, esld3: 0, esld4: 0, esld5: 0}
  };

  const totalMembers = input.household.members.adults + input.household.members.children;
  const totalEnergy = totalEnergyCalculation(input);
  const userHeatSource = input.household.sqm <= 100 ? 'heatSourceWood2' : 'heatSourceWood3';

  const woodHeat = constants[input.energy.heatSourceWood || userHeatSource] * constants.woodCubicToEnergyFactor;
  const heatRenovateArea = heatRenovateAreaCalculation(input, totalEnergy);
  const light = lightCalculation(input, totalEnergy, totalMembers);
  const water = waterCalculcation(input);
  const electronics = electronicsCalculcation(input);

  energyResult.heat.esld2 = woodHeat / totalMembers;
  energyResult.heat.esld1 = (
    (heatRenovateArea / totalMembers - energyResult.heat.esld2) *
    (heatSources.heatSource4 + heatSources.heatSource3 + heatSources.heatSource2 + heatSources.heatSource1)
  );
  energyResult.heat.esld3 = (
    (heatRenovateArea / totalMembers - energyResult.heat.esld2) *
    heatSources.heatSource7
  );
  energyResult.heat.esld4 = (
    (heatRenovateArea / totalMembers - energyResult.heat.esld2) *
    heatSources.heatSource6
  );
  energyResult.heat.esld5 = (
    (heatRenovateArea / totalMembers - energyResult.heat.esld2) *
    heatSources.heatSource5
  );

  energyResult.water.esld1 = (
    water *
    (
      heatSources.heatSource4 +
      (input.energy.heatSource === 'heatSource3' ? 1 : 0) +
      heatSources.heatSource2 +
      heatSources.heatSource1
    )
  );
  energyResult.water.esld3 = water * heatSources.heatSource7;
  energyResult.water.esld4 = water * heatSources.heatSource6;
  energyResult.water.esld5 = water * heatSources.heatSource5;

  energyResult.light.esld1 = light;

  energyResult.electronics.esld1 = electronics;

  return energyResult;
};

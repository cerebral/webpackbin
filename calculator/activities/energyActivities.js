const totalEnergyCalculation = require('../calculations/energy/totalEnergyCalculation');
const elInitialCalculation = require('../calculations/energy/elInitialCalculation');
const utils = require('../../utils/common');
const constants = require('../constants/energy.json');
const energyCorrectionFactorCalculation = require('../calculations/energy/energyCorrectionFactorCalculation');

module.exports = {
  activity_energy_household_simple_01(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalEnergy = totalEnergyCalculation(calculatorData);

      co2 = utils.toCo2(
        totalEnergy * constants.energyShareHeatAverage *
        (constants.averageIndoorTemp - 20) /
        constants.degreesHeated * constants.co2Factors.esld5 /
        365
      );
    }

    return {
      icon: 'activity_energy_05',
      category: 'energy',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_energy_household_simple_02(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalEnergy = totalEnergyCalculation(calculatorData);

      co2 = utils.toCo2(
        totalEnergy * constants.energyShareHeatAverage *
        (constants.averageIndoorTemp - 20) /
        constants.degreesHeated / 3 * constants.co2Factors.esld5 /
        365
      );
    }

    return {
      icon: 'activity_energy_07',
      category: 'energy',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_energy_household_simple_03(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      co2 = utils.toCo2(
        constants.lightsAverage * energyCorrectionFactorCalculation(calculatorData) *
        constants.lightSavingPotential * constants.co2Factors.esld1_1 /
        365
      );
    }

    return {
      icon: 'activity_energy_09',
      category: 'energy',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_energy_household_simple_04(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      co2 = utils.toCo2(
        constants.elAverage * energyCorrectionFactorCalculation(calculatorData) *
        (constants.energyShareWashing * (1 - constants.dishWasher1) + constants.energyShareTumble) *
        constants.dishVsClothingFactor * constants.co2Factors.esld1_1 /
        365
      );
    }

    return {
      icon: 'activity_energy_08',
      category: 'energy',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_energy_household_simple_05(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      co2 = utils.toCo2(
        constants.elAverage * energyCorrectionFactorCalculation(calculatorData) *
        (constants.energyShareWashing * (1 - constants.dishWasher1) + constants.energyShareTumble) *
        (1 - constants.dishVsClothingFactor) * constants.co2Factors.esld1_1 /
        365
      );
    }

    return {
      icon: 'activity_energy_10',
      category: 'energy',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_energy_household_simple_06(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalEnergy = totalEnergyCalculation(calculatorData);

      co2 = utils.toCo2(
        totalEnergy * constants.standbyPowerShare *
        constants.standbyPowerSavingPotential * constants.co2Factors.esld1_1 /
        365
      );
    }

    return {
      icon: 'activity_energy_04',
      category: 'energy',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_energy_household_simple_07(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const elInitial = elInitialCalculation(calculatorData);
      const totalHouseholdMembers = calculatorData.household.members.adults + calculatorData.household.members.children;

      co2 = utils.toCo2(
        elInitial * constants.energyShareGadget *
        (1 - constants.energySaver2) * totalHouseholdMembers /
        365 * constants.co2Factors.esld1_1
      );
    }

    return {
      icon: 'activity_energy_03',
      category: 'energy',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_energy_household_simple_08(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalHouseholdMembers = calculatorData.household.members.adults + calculatorData.household.members.children;

      co2 = utils.toCo2(
        constants.showerType2 * (constants.averageShowerLength - constants.shortShowerLength) *
        constants.waterHeatingEnergyLiters * totalHouseholdMembers * constants.co2Factors.esld5
      );
    }

    return {
      icon: 'activity_energy_01',
      category: 'energy',
      subCategory: 'shower',
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_energy_household_simple_09(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalHouseholdMembers = calculatorData.household.members.adults + calculatorData.household.members.children;

      co2 = utils.toCo2(
        constants.showerType2 * (constants.averageShowerLength - constants.bodyWashShowerLength) *
        constants.waterHeatingEnergyLiters * totalHouseholdMembers * constants.co2Factors.esld5
      );
    }

    return {
      icon: 'activity_energy_02',
      category: 'energy',
      subCategory: 'shower',
      co2,
      points: 5
    };
  },
  activity_energy_household_simple_10(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalHouseholdMembers = calculatorData.household.members.adults + calculatorData.household.members.children;

      co2 = utils.toCo2(
        (constants.hotWater3 - constants.hotWater1) * totalHouseholdMembers *
        constants.waterHeatingEnergyLiters * constants.co2Factors.esld5
      );
    }

    return {
      icon: 'activity_energy_11',
      category: 'energy',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  }
};

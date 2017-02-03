'use strict'
const calculation = require('./calculation');
const constants = require('../../constants/energy.json');
const commonUtils = require('../../../utils/common');

module.exports = (input) => {
  const calculations = [];
  let membersCount = input.household.members.adults + input.household.members.children;

  input.energy = input.energy || {};

  while (membersCount) {
    if (membersCount === 1) {
      calculations.unshift(calculation(input));
    } else {
      calculations.unshift(calculation({
        household: input.household,
        energy: {
          heatSource: input.energy.heatSource,
          renovateLevel: input.energy.renovateLevel,
          heatedArea: input.energy.heatedArea,
          indoorTemp: input.energy.indoorTemp,
          ledLights: input.energy.ledLights,
          heatSourceWood: input.energy.heatSourceWood,
          showerType: input.energy.showerType
        }
      }));
    }
    membersCount--;
  }

  const householdElectricityUsage = (
    input.energy.electricityUsage ||
    calculations.reduce((currentElectricityUsage, calcultationResult) => {
      return currentElectricityUsage + (
        calcultationResult.heat.esld1 +
        calcultationResult.water.esld1 +
        calcultationResult.light.esld1 +
        calcultationResult.electronics.esld1
      );
    }, 0)
  );

  return calculations
    .map((calcultationResult) => {
      const individualElectricityUsage = (
        calcultationResult.heat.esld1 +
        calcultationResult.water.esld1 +
        calcultationResult.light.esld1 +
        calcultationResult.electronics.esld1
      );
      const individualElectricityUsageShare = individualElectricityUsage / householdElectricityUsage;
      const actualElectricityUsage = householdElectricityUsage * individualElectricityUsageShare;
      const electricityShares = {
        heat: calcultationResult.heat.esld1 / individualElectricityUsage,
        water: calcultationResult.water.esld1 / individualElectricityUsage,
        light: calcultationResult.light.esld1 / individualElectricityUsage,
        electronics: calcultationResult.electronics.esld1 / individualElectricityUsage
      };

      calcultationResult.heat.esld1_1 = actualElectricityUsage * electricityShares.heat;
      calcultationResult.water.esld1_1 = actualElectricityUsage * electricityShares.water;
      calcultationResult.light.esld1_1 = actualElectricityUsage * electricityShares.light;
      calcultationResult.electronics.esld1_1 = actualElectricityUsage * electricityShares.electronics;

      return calcultationResult;
    })
    .reduce((result, calcultationResult, index) => {
      return Object.keys(calcultationResult).reduce((currentResult, key) => {
        if (!currentResult[key]) {
          currentResult[key] = {household: 0, individual: 0};
        }

        const total = commonUtils.toCo2(
          calcultationResult[key].esld1_1 * constants.co2Factors.esld1_1 +
          calcultationResult[key].esld2 * constants.co2Factors.esld2 +
          calcultationResult[key].esld3 * constants.co2Factors.esld3 +
          calcultationResult[key].esld4 * constants.co2Factors.esld4 +
          calcultationResult[key].esld5 * constants.co2Factors.esld5
        );

        currentResult[key].household = commonUtils.toCo2(currentResult[key].household + total);

        if (index === 0) {
          currentResult[key].individual = total;
        }

        return currentResult;
      }, result);
    }, {});
};

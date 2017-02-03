'use strict';
const calculateConsumption = require('../calculations/consumption');
const utils = require('../../utils/common');

module.exports = {
  activity_ikea_01(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const consumption = utils.sum(calculateConsumption({
        household: calculatorData.household
      }), 'household');

      co2 = utils.toCo2((consumption * 0.48 * 0.24) / 365);
    }

    return {
      icon: 'activity_consumption_07',
      category: 'consumption',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_ikea_02(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const consumption = utils.sum(calculateConsumption({
        household: calculatorData.household
      }), 'household');

      co2 = utils.toCo2((consumption * 0.48 * 0.04) / 365);
    }

    return {
      icon: 'activity_consumption_11',
      category: 'consumption',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  }
};

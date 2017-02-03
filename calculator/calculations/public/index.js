'use strict'
const calculation = require('./calculation');
const commonUtils = require('../../../utils/common');

module.exports = (input) => {
  const calculations = [];
  let membersCount = input.household.members.adults + input.household.members.children;

  while (membersCount) {
    calculations.unshift(calculation(input));

    membersCount--;
  }

  return calculations
    .reduce((result, calcultationResult, index) => {
      return Object.keys(calcultationResult).reduce((currentResult, key) => {
        if (!currentResult[key]) {
          currentResult[key] = {household: 0, individual: 0};
        }

        const total = calcultationResult[key];

        currentResult[key].household = commonUtils.toCo2(currentResult[key].household + total);

        if (index === 0) {
          currentResult[key].individual = commonUtils.toCo2(total);
        }

        return currentResult;
      }, result);
    }, {});
};

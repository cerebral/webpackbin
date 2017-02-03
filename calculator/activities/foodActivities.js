const calculateFood = require('../calculations/food/calculation');
const utils = require('../../utils/common');
const constants = require('../constants/food.json');

const totalFoodAverage1 = utils.sum(calculateFood({
  household: {members: {adults: 1, children: 0}},
  food: {}
}));
const totalFoodAverage2 = utils.sum(calculateFood({
  household: {members: {adults: 1, children: 0}},
  food: {meatConsumption: 'meatConsumption1'}
}));
const totalFoodAverage3 = utils.sum(calculateFood({
  household: {members: {adults: 1, children: 0}},
  food: {dairyAmount: 'dairyAmount3'}
}));
const totalFoodAverage4 = utils.sum(calculateFood({
  household: {members: {adults: 1, children: 0}},
  food: {meatConsumption: 'meatConsumption2'}
}));

module.exports = {
  activity_food_household_simple_01(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalMembers = calculatorData.household.members.adults + calculatorData.household.members.children;

      co2 = utils.toCo2(totalFoodAverage1 * (constants.foodWaste3 - constants.foodWaste1) * totalMembers / 365);
    }

    return {
      icon: 'activity_food_02',
      category: 'food',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_food_household_simple_02(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalMembers = calculatorData.household.members.adults + calculatorData.household.members.children;

      co2 = utils.toCo2((totalFoodAverage1 - totalFoodAverage2) * totalMembers / 365);
    }

    return {
      icon: 'activity_food_03',
      category: 'food',
      subCategory: 'dinner',
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_food_household_simple_03(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalMembers = calculatorData.household.members.adults + calculatorData.household.members.children;

      co2 = utils.toCo2((totalFoodAverage1 - totalFoodAverage3) * totalMembers / 365);
    }

    return {
      icon: 'activity_food_01',
      category: 'food',
      subCategory: null,
      co2,
      points: 5,
      isDailyHabit: true
    };
  },
  activity_food_household_simple_04(calculatorData) {
    let co2 = 0;

    if (calculatorData) {
      const totalMembers = calculatorData.household.members.adults + calculatorData.household.members.children;

      co2 = utils.toCo2((totalFoodAverage1 - totalFoodAverage4) * totalMembers / 365);
    }

    return {
      icon: 'activity_food_06',
      category: 'food',
      subCategory: 'dinner',
      co2,
      points: 5
    };
  }
};

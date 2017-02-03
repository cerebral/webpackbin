'use strict';
const commonUtils = require('../../../utils/common');
const referenceData = require('../../referenceData/food.json');
const constants = require('../../constants/food.json');

module.exports = (input) => {
  const daysInYear = 365;
  const dietAmount = constants[input.food.dietAmount || 'dietAmount3'];
  const meatConsumption = constants[input.food.meatConsumption || 'meatConsumption4'];
  const dairyAmount = constants[input.food.dairyAmount || 'dairyAmount4'];
  const foodWaste = constants[input.food.foodWaste || 'foodWaste3'];
  const {food1, food2, food3, food4, food5, food6} = referenceData;
  const foodChangeDairy = (
    (food5.food5_1.gramDay * food5.food5_1.caloriesGram * dietAmount * (1 - dairyAmount)) +
    (food5.food5_2.gramDay * food5.food5_2.caloriesGram * dietAmount * (1 - dairyAmount)) +
    (food5.food5_3.gramDay * food5.food5_3.caloriesGram * dietAmount * (1 - dairyAmount)) +
    (food5.food5_4.gramDay * food5.food5_4.caloriesGram * dietAmount * (1 - dairyAmount)) +
    (food5.food5_5.gramDay * food5.food5_5.caloriesGram * dietAmount * (1 - dairyAmount))
  ) / 6;
  const foodChangeMeat = (
    (food3.food3_1.gramDay * food3.food3_1.caloriesGram * dietAmount * (1 - meatConsumption)) +
    (food4.food4_1.gramDay * food4.food4_1.caloriesGram * dietAmount * (1 - meatConsumption))
  ) / 4;


  const co2 = {
    food1: {
      food1_1: (food1.food1_1.gramDay * food1.food1_1.caloriesGram * dietAmount + foodChangeDairy) * food1.food1_1.co2Calories * daysInYear,
      food1_2: (food1.food1_2.gramDay * food1.food1_2.caloriesGram * dietAmount + foodChangeDairy) * food1.food1_2.co2Calories * daysInYear,
      food1_3: food1.food1_3.gramDay * food1.food1_3.caloriesGram * dietAmount * food1.food1_3.co2Calories * daysInYear,
      food1_4: (food1.food1_4.gramDay * food1.food1_4.caloriesGram * dietAmount + foodChangeMeat) * food1.food1_4.co2Calories * daysInYear,
      food1_5: food1.food1_5.gramDay * food1.food1_5.caloriesGram * dietAmount * food1.food1_5.co2Calories * daysInYear
    },
    food2: {
      food2_1: (food2.food2_1.gramDay * food2.food2_1.caloriesGram * dietAmount + foodChangeDairy + foodChangeMeat) * food2.food2_1.co2Calories * daysInYear,
      food2_2: (food2.food2_2.gramDay * food2.food2_2.caloriesGram * dietAmount + foodChangeDairy + foodChangeMeat) * food2.food2_2.co2Calories * daysInYear,
      food2_3: (food2.food2_3.gramDay * food2.food2_3.caloriesGram * dietAmount + foodChangeDairy + foodChangeMeat) * food2.food2_3.co2Calories * daysInYear
    },
    food3: {
      food3_1: food3.food3_1.gramDay * food3.food3_1.caloriesGram * dietAmount * meatConsumption * food3.food3_1.co2Calories * daysInYear
    },
    food4: {
      food4_1: food4.food4_1.gramDay * food4.food4_1.caloriesGram * dietAmount * meatConsumption * food4.food4_1.co2Calories * daysInYear
    },
    food5: {
      food5_1: food5.food5_1.gramDay * food5.food5_1.caloriesGram * dietAmount * dairyAmount * food5.food5_1.co2Calories * daysInYear,
      food5_2: food5.food5_2.gramDay * food5.food5_2.caloriesGram * dietAmount * dairyAmount * food5.food5_2.co2Calories * daysInYear,
      food5_3: food5.food5_3.gramDay * food5.food5_3.caloriesGram * dietAmount * dairyAmount * food5.food5_3.co2Calories * daysInYear,
      food5_4: food5.food5_4.gramDay * food5.food5_4.caloriesGram * dietAmount * dairyAmount * food5.food5_4.co2Calories * daysInYear,
      food5_5: food5.food5_5.gramDay * food5.food5_5.caloriesGram * dietAmount * dairyAmount * food5.food5_5.co2Calories * daysInYear
    },
    food6: {
      food6_1: (food6.food6_1.gramDay * food6.food6_1.caloriesGram * dietAmount + foodChangeDairy) * food6.food6_1.co2Calories * daysInYear,
      food6_2: food6.food6_2.gramDay * food6.food6_2.caloriesGram * dietAmount * food6.food6_2.co2Calories * daysInYear,
      food6_3: food6.food6_3.gramDay * food6.food6_3.caloriesGram * dietAmount * food6.food6_3.co2Calories * daysInYear,
      food6_4: food6.food6_4.gramDay * food6.food6_4.caloriesGram * dietAmount * food6.food6_4.co2Calories * daysInYear,
      food6_5: food6.food6_5.gramDay * food6.food6_5.caloriesGram * dietAmount * food6.food6_5.co2Calories * daysInYear,
      food6_6: food6.food6_6.gramDay * food6.food6_6.caloriesGram * dietAmount * food6.food6_6.co2Calories * daysInYear,
      food6_7: food6.food6_7.gramDay * food6.food6_7.caloriesGram * dietAmount * food6.food6_7.co2Calories * daysInYear
    }
  };

  const co2Totals = {
    food1: co2.food1.food1_1 + co2.food1.food1_2 + co2.food1.food1_3 + co2.food1.food1_4 + co2.food1.food1_5,
    food2: co2.food2.food2_1 + co2.food2.food2_2 + co2.food2.food2_3,
    food3: co2.food3.food3_1,
    food4: co2.food4.food4_1,
    food5: co2.food5.food5_1 + co2.food5.food5_2 + co2.food5.food5_3 + co2.food5.food5_4 + co2.food5.food5_5,
    food6: co2.food6.food6_1 + co2.food6.food6_2 + co2.food6.food6_3 + co2.food6.food6_4 + co2.food6.food6_5 + co2.food6.food6_6 + co2.food6.food6_7
  };

  const co2Total = commonUtils.sum(co2Totals) / (1 - constants.transportStorageFactor - foodWaste);

  return {
    grain: commonUtils.toCo2(co2Totals.food1),
    fruitsAndVegetables: commonUtils.toCo2(co2Totals.food2),
    meat: commonUtils.toCo2(co2Totals.food3),
    fish: commonUtils.toCo2(co2Totals.food4),
    dairy: commonUtils.toCo2(co2Totals.food5),
    liquids: commonUtils.toCo2(co2Totals.food6),
    foodWaste: commonUtils.toCo2(co2Total * foodWaste),
    transportAndSales: commonUtils.toCo2(co2Total * constants.transportStorageFactor)
  };
};

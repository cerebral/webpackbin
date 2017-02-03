'use strict';
const commonUtils = require('../../../utils/common');
const getHouseholdType = require('./getHouseholdType');
const constants = require('../../constants/consumption.json');
const referenceData = require('../../referenceData/consumption.json');
const calculateShareHouse = require('./shareHouse');
const calculateServiceProductSavingTotal = require('./serviceProductSavingTotal');
const calculateInitialPersonalSpending = require('./initialPersonalSpending');
const calculateShareServices = require('./shareServices');
const calculateSpendingHouse = require('./spendingHouse');
const calculateActualPersonalSpending = require('./actualPersonalSpending');
const getTaxedIncome = require('./getTaxedIncome');

module.exports = (input) => {
  const totalSpending = getTaxedIncome(input.household);
  const totalMembers = input.household.members.adults + input.household.members.children;
  const householdType = getHouseholdType(input.household);
  const shareHouse = calculateShareHouse(householdType);
  const spendingHouse = calculateSpendingHouse(shareHouse, totalSpending);
  const initialPersonalSpending = calculateInitialPersonalSpending(spendingHouse, totalMembers);
  const totalPersonalSpending = commonUtils.sum(initialPersonalSpending);
  const actualPersonalSpendingDonations = input.consumption.yearlyDonationAmount || 0;
  const actualPersonalSpendingOther = (
    totalPersonalSpending * (
      (1 - commonUtils.sum(shareHouse)) *
      (1 - constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'])
    )
  );
  const shareServices = calculateShareServices(totalPersonalSpending, initialPersonalSpending);
  const serviceProductSavingTotal = calculateServiceProductSavingTotal(
    input,
    totalPersonalSpending,
    initialPersonalSpending,
    actualPersonalSpendingDonations,
    actualPersonalSpendingOther
  );
  const actualPersonalSpending = calculateActualPersonalSpending(
    input,
    totalPersonalSpending,
    actualPersonalSpendingDonations,
    actualPersonalSpendingOther,
    initialPersonalSpending,
    shareServices,
    serviceProductSavingTotal
  );

  const co2 = {
    maintenance: {
      con7: (
        referenceData.multipliers.con7 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.maintenance.con7 / 1000
      ),
      con8: (
        referenceData.multipliers.con8 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.maintenance.con8 / 1000
      ),
      con9: (
        referenceData.multipliers.con9 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        actualPersonalSpending.maintenance.con9 / 1000
      )
    },
    services: {
      con43: (
        referenceData.multipliers.con43 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.services.con43 / 1000
      ),
      con44: (
        referenceData.multipliers.con44 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.services.con44 / 1000
      ),
      con10: (
        referenceData.multipliers.con10 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.services.con10 / 1000
      ),
      con17: (
        referenceData.multipliers.con17 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.services.con17 / 1000
      )
    },
    furnitureAndEquipment: {
      con12: (
        referenceData.multipliers.con12 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.furnitureAndEquipment.con12 / 1000
      ),
      con13: (
        referenceData.multipliers.con13 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.furnitureAndEquipment.con13 / 1000
      ),
      con14: (
        referenceData.multipliers.con14 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.furnitureAndEquipment.con14 / 1000
      ),
      con15: (
        referenceData.multipliers.con15 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.furnitureAndEquipment.con15 / 1000
      ),
      con16: (
        referenceData.multipliers.con16 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.furnitureAndEquipment.con16 / 1000
      )
    },
    personalPurchases: {
      con25: (
        referenceData.multipliers.con25 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalPurchases.con25 / 1000
      ),
      con27: (
        referenceData.multipliers.con27 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalPurchases.con27 / 1000
      ),
      con28: (
        referenceData.multipliers.con28 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalPurchases.con28 / 1000
      ),
      con29: (
        referenceData.multipliers.con29 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalPurchases.con29 / 1000
      ),
      con41: (
        referenceData.multipliers.con41 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalPurchases.con41 / 1000
      ),
      con18: (
        referenceData.multipliers.con18 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalPurchases.con18 / 1000
      )
    },
    personalServices: {
      con19: (
        referenceData.multipliers.con19 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con19 / 1000
      ),
      con20: (
        referenceData.multipliers.con20 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con20 / 1000
      ),
      con26: (
        referenceData.multipliers.con26 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con26 / 1000
      ),
      con30: (
        referenceData.multipliers.con30 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con30 / 1000
      ),
      con45: (
        referenceData.multipliers.con45 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con45 / 1000
      ),
      con24: (
        referenceData.multipliers.con24 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con24 / 1000
      ),
      con31: (
        referenceData.multipliers.con31 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con31 / 1000
      ),
      con38: (
        referenceData.multipliers.con38 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con38 / 1000
      ),
      con39: (
        referenceData.multipliers.con39 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con39 / 1000
      ),
      con40: (
        referenceData.multipliers.con40 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con40 / 1000
      ),
      con42: (
        referenceData.multipliers.con42 *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.personalServices.con42 / 1000
      )
    },
    clothesAndShoes: {
      con5: (
        referenceData.multipliers.con5 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.clothesAndShoes.con5 / 1000
      ),
      con6: (
        referenceData.multipliers.con6 *
        constants[input.consumption.qualityConsumer || 'qualityConsumer3'] *
        constants[input.consumption.repairConsumer || 'repairConsumer3'] *
        constants[input.consumption.wasteConsumer || 'wasteConsumer3'] *
        constants[input.consumption.ethicalConsumer || 'ethicalConsumer3'] *
        actualPersonalSpending.clothesAndShoes.con6 / 1000
      )
    }
  };

  return {
    maintenance: commonUtils.toCo2(commonUtils.sum(co2.maintenance)),
    services: commonUtils.toCo2(commonUtils.sum(co2.services)),
    furnitureAndEquipment: commonUtils.toCo2(commonUtils.sum(co2.furnitureAndEquipment)),
    personalPurchases: commonUtils.toCo2(commonUtils.sum(co2.personalPurchases)),
    personalServices: commonUtils.toCo2(commonUtils.sum(co2.personalServices)),
    clothesAndShoes: commonUtils.toCo2(commonUtils.sum(co2.clothesAndShoes))
  };
};

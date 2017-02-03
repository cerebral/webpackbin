const referenceData = require('../../referenceData/consumption.json');

module.exports = function shareHouse(householdType) {
  return {
    maintenance: {
      con7: referenceData.con7[householdType] / referenceData.total[householdType],
      con8: referenceData.con8[householdType] / referenceData.total[householdType],
      con9: referenceData.con9[householdType] / referenceData.total[householdType]
    },
    services: {
      con43: referenceData.con43[householdType] / referenceData.total[householdType],
      con44: referenceData.con44[householdType] / referenceData.total[householdType],
      con10: referenceData.con10[householdType] / referenceData.total[householdType],
      con17: referenceData.con17[householdType] / referenceData.total[householdType]
    },
    furnitureAndEquipment: {
      con12: referenceData.con12[householdType] / referenceData.total[householdType],
      con13: referenceData.con13[householdType] / referenceData.total[householdType],
      con14: referenceData.con14[householdType] / referenceData.total[householdType],
      con15: referenceData.con15[householdType] / referenceData.total[householdType],
      con16: referenceData.con16[householdType] / referenceData.total[householdType]
    },
    personalPurchases: {
      con25: referenceData.con25[householdType] / referenceData.total[householdType],
      con27: referenceData.con27[householdType] / referenceData.total[householdType],
      con28: referenceData.con28[householdType] / referenceData.total[householdType],
      con29: referenceData.con29[householdType] / referenceData.total[householdType],
      con41: referenceData.con41[householdType] / referenceData.total[householdType],
      con18: referenceData.con18[householdType] / referenceData.total[householdType]
    },
    personalServices: {
      con19: referenceData.con19[householdType] / referenceData.total[householdType],
      con20: referenceData.con20[householdType] / referenceData.total[householdType],
      con26: referenceData.con26[householdType] / referenceData.total[householdType],
      con30: referenceData.con30[householdType] / referenceData.total[householdType],
      con45: referenceData.con45[householdType] / referenceData.total[householdType],
      con24: referenceData.con24[householdType] / referenceData.total[householdType],
      con31: referenceData.con31[householdType] / referenceData.total[householdType],
      con38: referenceData.con38[householdType] / referenceData.total[householdType],
      con39: referenceData.con39[householdType] / referenceData.total[householdType],
      con40: referenceData.con40[householdType] / referenceData.total[householdType],
      con42: referenceData.con42[householdType] / referenceData.total[householdType]
    },
    clothesAndShoes: {
      con5: referenceData.con5[householdType] / referenceData.total[householdType],
      con6: referenceData.con6[householdType] / referenceData.total[householdType]
    },
    donations: {
      con46: referenceData.con46[householdType] / referenceData.total[householdType]
    },
    other: {
      con47: referenceData.con47[householdType] / referenceData.total[householdType]
    }
  };
};

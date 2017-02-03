module.exports = function initialPersonalSpending(spendingHouse, totalMembers) {
  return {
    maintenance: {
      con7: spendingHouse.maintenance.con7 / totalMembers,
      con8: spendingHouse.maintenance.con8 / totalMembers,
      con9: spendingHouse.maintenance.con9 / totalMembers
    },
    services: {
      con43: spendingHouse.services.con43 / totalMembers,
      con44: spendingHouse.services.con44 / totalMembers,
      con10: spendingHouse.services.con10 / totalMembers,
      con17: spendingHouse.services.con17 / totalMembers
    },
    furnitureAndEquipment: {
      con12: spendingHouse.furnitureAndEquipment.con12 / totalMembers,
      con13: spendingHouse.furnitureAndEquipment.con13 / totalMembers,
      con14: spendingHouse.furnitureAndEquipment.con14 / totalMembers,
      con15: spendingHouse.furnitureAndEquipment.con15 / totalMembers,
      con16: spendingHouse.furnitureAndEquipment.con16 / totalMembers
    },
    personalPurchases: {
      con25: spendingHouse.personalPurchases.con25 / totalMembers,
      con27: spendingHouse.personalPurchases.con27 / totalMembers,
      con28: spendingHouse.personalPurchases.con28 / totalMembers,
      con29: spendingHouse.personalPurchases.con29 / totalMembers,
      con41: spendingHouse.personalPurchases.con41 / totalMembers,
      con18: spendingHouse.personalPurchases.con18 / totalMembers
    },
    personalServices: {
      con19: spendingHouse.personalServices.con19 / totalMembers,
      con20: spendingHouse.personalServices.con20 / totalMembers,
      con26: spendingHouse.personalServices.con26 / totalMembers,
      con30: spendingHouse.personalServices.con30 / totalMembers,
      con45: spendingHouse.personalServices.con45 / totalMembers,
      con24: spendingHouse.personalServices.con24 / totalMembers,
      con31: spendingHouse.personalServices.con31 / totalMembers,
      con38: spendingHouse.personalServices.con38 / totalMembers,
      con39: spendingHouse.personalServices.con39 / totalMembers,
      con40: spendingHouse.personalServices.con40 / totalMembers,
      con42: spendingHouse.personalServices.con42 / totalMembers
    },
    clothesAndShoes: {
      con5: spendingHouse.clothesAndShoes.con5 / totalMembers,
      con6: spendingHouse.clothesAndShoes.con6 / totalMembers
    },
    donations: {
      con46: spendingHouse.donations.con46 / totalMembers
    },
    other: {
      con47: spendingHouse.other.con47 / totalMembers
    }
  };
};

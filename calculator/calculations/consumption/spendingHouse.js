module.exports = function spendingHouse(shareHouse, totalSpending) {
  return {
    maintenance: {
      con7: shareHouse.maintenance.con7 * totalSpending,
      con8: shareHouse.maintenance.con8 * totalSpending,
      con9: shareHouse.maintenance.con9 * totalSpending
    },
    services: {
      con43: shareHouse.services.con43 * totalSpending,
      con44: shareHouse.services.con44 * totalSpending,
      con10: shareHouse.services.con10 * totalSpending,
      con17: shareHouse.services.con17 * totalSpending
    },
    furnitureAndEquipment: {
      con12: shareHouse.furnitureAndEquipment.con12 * totalSpending,
      con13: shareHouse.furnitureAndEquipment.con13 * totalSpending,
      con14: shareHouse.furnitureAndEquipment.con14 * totalSpending,
      con15: shareHouse.furnitureAndEquipment.con15 * totalSpending,
      con16: shareHouse.furnitureAndEquipment.con16 * totalSpending
    },
    personalPurchases: {
      con25: shareHouse.personalPurchases.con25 * totalSpending,
      con27: shareHouse.personalPurchases.con27 * totalSpending,
      con28: shareHouse.personalPurchases.con28 * totalSpending,
      con29: shareHouse.personalPurchases.con29 * totalSpending,
      con41: shareHouse.personalPurchases.con41 * totalSpending,
      con18: shareHouse.personalPurchases.con18 * totalSpending
    },
    personalServices: {
      con19: shareHouse.personalServices.con19 * totalSpending,
      con20: shareHouse.personalServices.con20 * totalSpending,
      con26: shareHouse.personalServices.con26 * totalSpending,
      con30: shareHouse.personalServices.con30 * totalSpending,
      con45: shareHouse.personalServices.con45 * totalSpending,
      con24: shareHouse.personalServices.con24 * totalSpending,
      con31: shareHouse.personalServices.con31 * totalSpending,
      con38: shareHouse.personalServices.con38 * totalSpending,
      con39: shareHouse.personalServices.con39 * totalSpending,
      con40: shareHouse.personalServices.con40 * totalSpending,
      con42: shareHouse.personalServices.con42 * totalSpending
    },
    clothesAndShoes: {
      con5: shareHouse.clothesAndShoes.con5 * totalSpending,
      con6: shareHouse.clothesAndShoes.con6 * totalSpending
    },
    donations: {
      con46: shareHouse.donations.con46 * totalSpending
    },
    other: {
      con47: shareHouse.other.con47 * totalSpending
    }
  };
};

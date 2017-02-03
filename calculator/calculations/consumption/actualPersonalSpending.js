const constants = require('../../constants/consumption.json');

module.exports = function actualPersonalSpending(
  input,
  totalPersonalSpending,
  actualPersonalSpendingDonations,
  actualPersonalSpendingOther,
  initialPersonalSpending,
  shareServices,
  serviceProductSavingTotal
) {
  return {
    maintenance: {
      con7: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.maintenance.con7 / totalPersonalSpending)
      ),
      con8: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.maintenance.con8 / totalPersonalSpending)
      ),
      con9: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.maintenance.con9 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      )
    },
    services: {
      con43: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.services.con43 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.services.con43 / totalPersonalSpending) /
        shareServices
      ),
      con44: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.services.con44 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.services.con44 / totalPersonalSpending) /
        shareServices
      ),
      con10: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.services.con10 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.services.con10 / totalPersonalSpending) /
        shareServices
      ),
      con17: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.services.con17 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.services.con17 / totalPersonalSpending) /
        shareServices
      )
    },
    furnitureAndEquipment: {
      con12: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.furnitureAndEquipment.con12 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con13: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.furnitureAndEquipment.con13 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con14: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.furnitureAndEquipment.con14 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con15: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.furnitureAndEquipment.con15 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con16: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.furnitureAndEquipment.con16 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      )
    },
    personalPurchases: {
      con25: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalPurchases.con25 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con27: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalPurchases.con27 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con28: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalPurchases.con28 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con29: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalPurchases.con29 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con41: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalPurchases.con41 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con18: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalPurchases.con18 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      )
    },
    personalServices: {
      con19: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con19 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con19 / totalPersonalSpending) /
        shareServices
      ),
      con20: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con20 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con20 / totalPersonalSpending) /
        shareServices
      ),
      con26: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con26 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con26 / totalPersonalSpending) /
        shareServices
      ),
      con30: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con30 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con30 / totalPersonalSpending) /
        shareServices
      ),
      con45: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con45 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con45 / totalPersonalSpending) /
        shareServices
      ),
      con24: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con24 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con24 / totalPersonalSpending) /
        shareServices
      ),
      con31: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con31 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con31 / totalPersonalSpending) /
        shareServices
      ),
      con38: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con38 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con38 / totalPersonalSpending) /
        shareServices
      ),
      con39: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con39 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con39 / totalPersonalSpending) /
        shareServices
      ),
      con40: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con40 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con40 / totalPersonalSpending) /
        shareServices
      ),
      con42: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.personalServices.con42 / totalPersonalSpending) +
        serviceProductSavingTotal * (initialPersonalSpending.personalServices.con42 / totalPersonalSpending) /
        shareServices
      )
    },
    clothesAndShoes: {
      con5: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.clothesAndShoes.con5 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      ),
      con6: (
        (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
        (initialPersonalSpending.clothesAndShoes.con6 / totalPersonalSpending) *
        constants[input.consumption.serviceConsumer || 'serviceConsumer3']
      )
    },
    donations: {
      con46: actualPersonalSpendingDonations
    },
    other: {
      con47: actualPersonalSpendingOther
    }
  };
};

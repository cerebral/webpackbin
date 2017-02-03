const constants = require('../../constants/consumption.json');

module.exports = function serviceProductSavingTotal(
  input,
  totalPersonalSpending,
  initialPersonalSpending,
  actualPersonalSpendingDonations,
  actualPersonalSpendingOther
) {
  return (
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.maintenance.con9 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.furnitureAndEquipment.con12 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.furnitureAndEquipment.con13 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.furnitureAndEquipment.con14 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.furnitureAndEquipment.con15 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.furnitureAndEquipment.con16 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.personalPurchases.con25 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.personalPurchases.con27 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.personalPurchases.con28 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.personalPurchases.con29 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.personalPurchases.con41 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.personalPurchases.con18 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.clothesAndShoes.con5 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    ) +
    (
      (totalPersonalSpending - actualPersonalSpendingDonations - actualPersonalSpendingOther) *
      (initialPersonalSpending.clothesAndShoes.con6 / totalPersonalSpending) *
      (1 - constants[input.consumption.serviceConsumer || 'serviceConsumer3'])
    )
  );
};

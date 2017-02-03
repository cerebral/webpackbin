module.exports = function shareServices(totalPersonalSpending, initialPersonalSpending) {
  return (
    (initialPersonalSpending.services.con43 / totalPersonalSpending) +
    (initialPersonalSpending.services.con44 / totalPersonalSpending) +
    (initialPersonalSpending.services.con10 / totalPersonalSpending) +
    (initialPersonalSpending.services.con17 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con19 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con20 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con26 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con30 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con45 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con24 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con31 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con38 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con39 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con40 / totalPersonalSpending) +
    (initialPersonalSpending.personalServices.con42 / totalPersonalSpending)
  );
};

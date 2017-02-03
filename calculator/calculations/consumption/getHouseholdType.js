module.exports = function getHouseholdType(household) {
  if (household.members.adults === 1 && household.members.children === 0) {
    return 'householdType2';
  }

  if (household.members.adults === 2 && household.members.children === 0) {
    return 'householdType3';
  }

  if (household.members.adults === 1) {
    return 'householdType4';
  }

  if (household.members.adults === 2 && household.members.children === 1) {
    return 'householdType5';
  }

  if (household.members.adults === 2 && household.members.children === 2) {
    return 'householdType6';
  }

  if (household.members.adults === 2) {
    return 'householdType7';
  }

  if (household.members.adults >= 3) {
    return 'householdType8';
  }

  return 'householdType1';
};

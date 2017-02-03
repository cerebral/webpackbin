function getSqm(input) {
  if (Number(input.household.sqm) < 20) {
    return 20;
  }

  return input.household.sqm;
}

module.exports = getSqm;

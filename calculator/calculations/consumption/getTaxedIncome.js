const tax = require('../../referenceData/tax.json');
const getIncome = require('./getIncome');

module.exports = function getTaxedIncome(household) {
  let adultsCount = Number(household.members.adults);
  const income = Number(getIncome(household.income)) / adultsCount;
  let taxedIncome = 0;

  while (adultsCount) {
    taxedIncome += Number(income) * Object.keys(tax).reduce((currentTax, taxKey) => {
      if (Number(income) >= Number(taxKey)) {
        return Number(tax[taxKey]);
      }

      return currentTax;
    }, 1);

    adultsCount -= 1;
  }

  return taxedIncome;
};

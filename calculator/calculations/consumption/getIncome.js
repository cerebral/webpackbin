function getIncome(income) {
  if (Number(income) < 100000) {
    return 100000;
  }

  return income;
}

module.exports = getIncome;

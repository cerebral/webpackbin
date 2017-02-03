const constants = require('../../constants/energy.json');

module.exports = (input, totalEnergy) => {
  const heatRenovateAreaMiddleCalc = (
    (
      totalEnergy *
      constants.energyShareHeatAverage *
      constants[input.energy.renovateLevel || 'renovateLevel4'] *
      constants[input.energy.heatedArea || 'heatedArea3']
    ) /
    constants.heatedAreaAverage
  );

  return (
    heatRenovateAreaMiddleCalc - (
      (
        heatRenovateAreaMiddleCalc *
        (constants.averageIndoorTemp - constants[input.energy.indoorTemp || 'indoorTemp3'])
      ) /
      constants.degreesHeated
    )
  );
};

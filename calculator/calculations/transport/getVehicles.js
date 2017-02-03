function getVehicles(input) {
  const useDefault = !Boolean(input.transport.vehicles);

  return {
    electric: useDefault ? 0 : input.transport.vehicles.electric,
    hybrid: useDefault ? 0 : input.transport.vehicles.hybrid,
    fossil: useDefault ? input.household.members.adults : input.transport.vehicles.fossil,
    motorbike: useDefault ? 0 : input.transport.vehicles.motorbike
  };
}

module.exports = getVehicles;

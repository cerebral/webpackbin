const constants = require('./constants/transport.json');

module.exports = {
  calculate(input) {
    return {
      energy: require('./calculations/energy')(input),
      food: require('./calculations/food')(input),
      transport: require('./calculations/transport')(input),
      consumption: require('./calculations/consumption')(input),
      public: require('./calculations/public')(input)
    };
  },
  getDefaultTransportWorkFreq: require('./calculations/transport/getDefaultTransportWorkFreq'),
  getDefaultTransportSocialKm: require('./calculations/transport/getDefaultTransportSocialKm'),
  getActivity: require('./activities').getActivity,
  getAllActivities: require('./activities').getAllActivities,
  convertMinToKm(value, type) {
    if (value < 0 || !type || (type !== 'car' && type !== 'public')) {
      throw new Error('You have to pass a valid value and a correct type to the converter');
    }

    const constant = type === 'public' ? constants.kmPerMinutePublicShort : constants.kmPerMinuteCar;

    return Number((value * constant).toFixed());
  },
  convertKmToMin(value, type) {
    if (value < 0 || !type || (type !== 'car' && type !== 'public')) {
      throw new Error('You have to pass a valid value and a correct type to the converter');
    }

    const constant = type === 'public' ? constants.kmPerMinutePublicShort : constants.kmPerMinuteCar;

    return Number((value / constant).toFixed());
  }
};

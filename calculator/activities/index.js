const staticActivities = require('./staticActivities');
const ikeaActivities = require('./ikeaActivities');
const foodActivities = require('./foodActivities');
const energyActivities = require('./energyActivities');
const activities = Object.assign(staticActivities, ikeaActivities, foodActivities, energyActivities);

function getActivity(activityName, calculatorData) {
  const activity = activities[activityName];

  if (!activity) {
    throw new Error('There is no activity named ' + activityName);
  }

  return activity(calculatorData);
}

module.exports = {
  getActivity,
  getAllActivities(calculatorData) {
    return Object.keys(activities).reduce((allActivities, activityKey) => {
      const activity = getActivity(activityKey, calculatorData);

      allActivities[activityKey] = activity;

      return allActivities;
    }, {});
  }
};

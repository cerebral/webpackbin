function updateCreatedStats({ firebase }) {
  return firebase
    .transaction('stats.total', totalStats => {
      if (!totalStats) {
        return {
          createdCount: 1,
        };
      }

      return Object.assign(totalStats, {
        createdCount: (totalStats.createdCount || 0) + 1,
      });
    })
    .then(() => {
      return {};
    })
    .catch(err => {
      return { error: err.message };
    });
}

export default updateCreatedStats;

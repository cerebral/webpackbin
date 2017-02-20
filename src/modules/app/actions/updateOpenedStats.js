import Firebase from 'firebase'

function updateOpenedStats ({state, firebase}) {
  const updateBin = firebase.transaction(`stats.bins.${state.get('app.currentBinKey')}`, (binStats) => {
    if (!binStats) {
      return {
        seenCount: 1,
        lastSeenDatetime: Firebase.database.ServerValue.TIMESTAMP
      }
    }

    return {
      seenCount: binStats.seenCount + 1,
      lastSeenDatetime: Firebase.database.ServerValue.TIMESTAMP
    }
  })
  const updateTotal = firebase.transaction(`stats.total`, (totalStats) => {
    if (!totalStats) {
      return {
        seenCount: 1
      }
    }

    return Object.assign(totalStats, {
      seenCount: (totalStats.seenCount || 0) + 1
    })
  })
  return Promise.all([
    updateBin,
    updateTotal
  ])
    .then(() => {
      return {}
    })
    .catch((err) => {
      return {error: err.message}
    })
}

export default updateOpenedStats

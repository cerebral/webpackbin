import Firebase from 'firebase'

function updateViewStats ({state, firebase}) {
  const updateBin = firebase.transaction(`stats.bins.${state.get('app.currentBinKey')}`, (binStats) => {
    if (!binStats) {
      return {
        viewCount: 1,
        lastViewDatetime: Firebase.database.ServerValue.TIMESTAMP
      }
    }

    return {
      viewCount: binStats.viewCount + 1,
      lastViewDatetime: Firebase.database.ServerValue.TIMESTAMP
    }
  })
  const updateTotal = firebase.transaction(`stats.total`, (totalStats) => {
    if (!totalStats) {
      return {
        viewCount: 1
      }
    }

    return Object.assign(totalStats, {
      viewCount: (totalStats.viewCount || 0) + 1
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

export default updateViewStats

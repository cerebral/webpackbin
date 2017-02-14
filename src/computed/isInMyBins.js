import {compute} from 'cerebral'
import {state} from 'cerebral/tags'

export default compute(
  state`app.currentBinKey`,
  state`myBins.list`,
  (currentBinKey, myBins) => {
    return Object.keys(myBins).reduce((isInMyBins, myBinKey) => {
      if (isInMyBins) {
        return isInMyBins
      }

      if (myBins[myBinKey].binKey === currentBinKey) {
        return true
      }

      return false
    }, false)
  }
)

import {compute} from 'cerebral'
import {state} from 'cerebral/tags'

export default compute(
  state`app.currentBinKey`,
  state`favorites.list`,
  (currentBinKey, favorites) => {
    return Object.keys(favorites).reduce((isInFavorites, favoriteKey) => {
      if (isInFavorites) {
        return isInFavorites
      }

      if (favorites[favoriteKey].binKey === currentBinKey) {
        return true
      }

      return false
    }, false)
  }
)

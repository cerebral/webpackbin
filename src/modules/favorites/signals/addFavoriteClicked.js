import {set, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import isInFavorites from 'computed/isInFavorites'
import removeFavorite from '../chains/removeFavorite'

export default [
  when(isInFavorites), {
    true: removeFavorite,
    false: set(state`favorites.showNewTitleInput`, true)
  }
]

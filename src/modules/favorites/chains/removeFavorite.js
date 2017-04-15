import {unset} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import removeFavorite from '../actions/removeFavorite'

export default [
  removeFavorite, {
    success: [
      unset(state`favorites.list.${props`favoriteKey`}`),
      showSnackbar('Bin removed from favorites', 5000)
    ],
    error: showSnackbar('Could not remove bin from favorites', 5000, 'error')
  }
]

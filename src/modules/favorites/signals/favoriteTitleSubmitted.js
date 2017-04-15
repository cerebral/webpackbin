import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import addToFavorites from '../actions/addToFavorites'

export default [
  set(state`favorites.showNewTitleInput`, false),
  addToFavorites, {
    success: [
      set(state`favorites.list.${props`key`}`, props`favorite`),
      set(state`favorites.newMyBinTitle`, ''),
      showSnackbar('Bin added to favorites', 5000)
    ],
    error: showSnackbar('Could not add favorite, sorry', 5000, 'error')
  }
]

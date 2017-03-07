import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import addToMyBins from '../actions/addToMyBins'

export default [
  set(state`myBins.showNewTitleInput`, false),
  addToMyBins, {
    success: [
      set(state`myBins.list.${props`key`}`, props`myBin`),
      set(state`myBins.newMyBinTitle`, ''),
      showSnackbar('Bin added to my bins', 5000)
    ],
    error: showSnackbar('Could not add bin, sorry', 5000, 'error')
  }
]

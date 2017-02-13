import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import showSnackbar from '../factories/showSnackbar'
import addToMyBins from '../actions/addToMyBins'

export default [
  set(state`app.showMyBinsTitleInput`, false),
  addToMyBins, {
    success: [
      set(state`app.myBins.${props`key`}`, props`myBin`),
      set(state`app.myBinsTitle`, ''),
      ...showSnackbar('Bin added', 5000)
    ],
    error: [
      ...showSnackbar('Could not add bin, sorry', 5000, 'error')
    ]
  }
]

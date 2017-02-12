import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import redirectToBin from '../factories/redirectToBin'
import saveNewBin from '../actions/saveNewBin'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  saveNewBin, {
    success: [
      set(state`bin.currentBinKey`, props`binKey`),
      redirectToBin(props`binKey`)
    ],
    error: [
      ...showSnackbar('Could not create new bin', 5000, 'error')
    ]
  }
]

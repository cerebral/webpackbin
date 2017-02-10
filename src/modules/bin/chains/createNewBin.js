import {set} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'
import redirectToBin from '../factories/redirectToBin'
import saveNewBin from '../actions/saveNewBin'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  saveNewBin, {
    success: [
      set(state`bin.currentBin`, input`bin`),
      redirectToBin(input`bin.key`)
    ],
    error: [
      ...showSnackbar('Could not create new bin', 5000, 'error')
    ]
  }
]

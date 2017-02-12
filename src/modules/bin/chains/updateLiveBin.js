import updateLiveBin from '../actions/updateLiveBin'
import updateSandbox from '../chains/updateSandbox'
import showSnackbar from 'modules/app/factories/showSnackbar'
import {set as firebaseSet} from 'cerebral-provider-firebase'
import {state, string} from 'cerebral/tags'

export default [
  [
    updateLiveBin, {
      success: [
        ...updateSandbox
      ],
      error: [
        ...showSnackbar('Could not save files', 5000, 'error')
      ]
    },
    firebaseSet(string`codeChanges.${state`bin.currentBinKey`}`, null), {
      success: [],
      error: []
    }
  ]
]

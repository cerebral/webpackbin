import updateLiveBin from '../actions/updateLiveBin'
import updateSandbox from 'modules/sandbox/factories/updateSandbox'
import showSnackbar from 'modules/app/factories/showSnackbar'
import {set as firebaseSet} from 'cerebral-provider-firebase'
import {state, string} from 'cerebral/tags'

export default [
  [
    updateLiveBin, {
      success: [
        ...updateSandbox()
      ],
      error: [
        ...showSnackbar('Could not save files', 5000, 'error')
      ]
    },
    firebaseSet(string`codeChanges.${state`app.currentBinKey`}`, null), {
      success: [],
      error: []
    }
  ]
]

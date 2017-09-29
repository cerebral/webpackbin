import {parallel} from 'cerebral'
import updateLiveBin from '../actions/updateLiveBin'
import updateSandbox from 'modules/sandbox/factories/updateSandbox'
import showSnackbar from 'modules/app/factories/showSnackbar'
import {set as firebaseSet} from '@cerebral/firebase/operators'
import {state, string} from 'cerebral/tags'

export default parallel('updateLiveBin', [
  updateLiveBin, {
    success: updateSandbox(),
    error: showSnackbar('Could not save files', 5000, 'error')
  },
  firebaseSet(string`codeChanges.${state`app.currentBinKey`}`, null), {
    success: [],
    error: []
  }
])

import {set, when} from 'cerebral/operators'
import {state, string} from 'cerebral/tags'
import {set as setFirebase} from 'cerebral-provider-firebase/operators'

export default [
  when(state`app.currentBin.forceNoLint`), {
    true: set(state`app.currentBin.forceNoLint`, false),
    false: set(state`app.currentBin.forceNoLint`, true)
  },
  setFirebase(
    string`bins.${state`app.currentBinKey`}.forceNoLint`,
    state`app.currentBin.forceNoLint`
  ), {
    success: [],
    error: []
  }
]

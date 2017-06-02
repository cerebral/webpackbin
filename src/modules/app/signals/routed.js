import updateSandbox from 'modules/sandbox/factories/updateSandbox'
import {set, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import stopListeningToBinUpdates from 'modules/live/actions/stopListeningToBinUpdates'
import resetCurrentBin from '../actions/resetCurrentBin'
import forceCodeUpdate from 'modules/code/actions/forceCodeUpdate'

export default [
  when(state`app.currentBin.isLive`), {
    true: stopListeningToBinUpdates,
    false: []
  },
  resetCurrentBin,
  set(state`app.currentBinKey`, null),
  forceCodeUpdate,
  updateSandbox(),
  set(state`app.currentBin.owner`, state`app.user.uid`),
  set(state`configure.showQuickstart`, true)
]

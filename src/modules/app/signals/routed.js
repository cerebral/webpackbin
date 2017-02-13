import updateSandbox from 'modules/bin/chains/updateSandbox'
import {set, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import stopListeningToBinUpdates from 'modules/bin/actions/stopListeningToBinUpdates'
import resetCurrentBin from 'modules/bin/actions/resetCurrentBin'
import forceCodeUpdate from 'modules/bin/actions/forceCodeUpdate'

export default [
  when(state`bin.currentBin.isLive`), {
    true: [
      stopListeningToBinUpdates
    ],
    false: []
  },
  resetCurrentBin,
  set(state`bin.currentBinKey`, null),
  forceCodeUpdate,
  ...updateSandbox,
  set(state`bin.currentBin.owner`, state`app.user.uid`)
]

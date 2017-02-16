import updateBinWithTemplate from '../actions/updateBinWithTemplate'
import updateSandbox from 'modules/sandbox/chains/updateSandbox'
import updateLiveBin from 'modules/live/chains/updateLiveBin'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'
import forceCodeUpdate from 'modules/code/actions/forceCodeUpdate'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  updateBinWithTemplate,
  set(state`app.currentBin.showConfiguration`, false),
  forceCodeUpdate,
  whenLiveCurrentUser, {
    true: [
      ...updateLiveBin
    ],
    false: [
      ...updateSandbox
    ]
  }
]

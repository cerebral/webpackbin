import changeCodeFromLive from '../actions/changeCodeFromLive'
import forceCodeUpdate from 'modules/code/actions/forceCodeUpdate'
import whenLiveParticipant from 'modules/app/actions/whenLiveParticipant'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  whenLiveParticipant, {
    true: [
      set(state`app.showSandbox`, false),
      changeCodeFromLive,
      set(state`app.currentBin.changedFiles.${state`app.currentBin.selectedFileIndex`}`, true),
      set(state`code.isLinting`, true),
      forceCodeUpdate
    ],
    false: []
  }
]

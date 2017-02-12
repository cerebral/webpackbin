import changeCodeFromLive from '../actions/changeCodeFromLive'
import forceCodeUpdate from '../actions/forceCodeUpdate'
import whenLiveParticipant from '../actions/whenLiveParticipant'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  whenLiveParticipant, {
    true: [
      changeCodeFromLive,
      set(state`bin.currentBin.changedFiles.${state`bin.currentBin.selectedFileIndex`}`, true),
      set(state`bin.isLinting`, true),
      forceCodeUpdate
    ],
    false: []
  }
]

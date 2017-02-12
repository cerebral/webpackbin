import changeCode from '../actions/changeCode'
import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import whenLiveCurrentUser from '../actions/whenLiveCurrentUser'
import updateFirebaseCodeChange from '../actions/updateFirebaseCodeChange'

export default [
  changeCode,
  set(state`bin.currentBin.changedFiles.${state`bin.currentBin.selectedFileIndex`}`, true),
  set(state`bin.isLinting`, true),
  whenLiveCurrentUser, {
    true: [
      set(props`codeChange.fileIndex`, state`bin.currentBin.selectedFileIndex`),
      updateFirebaseCodeChange, {
        success: [],
        error: []
      }
    ],
    false: []
  }
]

import changeCode from '../actions/changeCode'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  changeCode,
  set(state`bin.files.changedFiles.${state`bin.files.selectedFileIndex`}`, true),
  set(state`bin.isLinting`, true)
]

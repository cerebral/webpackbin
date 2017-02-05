import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`bin.files.newFileName`, ''),
  set(state`bin.files.newFileIsEntry`, false),
  set(state`bin.files.showNewFileInput`, '')
]

import {set} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'

export default [
  set(state`bin.currentBin.files.${state`bin.files.selectedFileIndex`}.lastCursorPosition`, input`cursorPosition`)
]

import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

export default [
  set(state`bin.currentBin.files.${state`bin.currentBin.selectedFileIndex`}.lastCursorPosition`, props`cursorPosition`)
]

import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

export default [
  set(state`app.currentBin.files.${state`app.currentBin.selectedFileIndex`}.lastCursorPosition`, props`cursorPosition`)
]

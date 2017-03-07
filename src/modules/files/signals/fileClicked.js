import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default [
  set(state`app.currentBin.selectedFileIndex`, props`index`),
  set(state`app.isFilesMenuOpen`, false),
  set(state`app.showSandbox`, false),
  updateFirebaseBin('selectedFileIndex')
]

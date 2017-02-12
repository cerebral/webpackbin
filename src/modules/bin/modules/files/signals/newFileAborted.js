import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from 'modules/bin/factories/updateFirebaseBin'

export default [
  set(state`bin.currentBin.newFileName`, ''),
  set(state`bin.currentBin.newFileIsEntry`, false),
  set(state`bin.currentBin.showNewFileInput`, false),
  ...updateFirebaseBin([
    'showNewFileInput',
    'newFileIsEntry',
    'newFileName'
  ])
]

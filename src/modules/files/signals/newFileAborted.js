import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default [
  set(state`app.currentBin.newFileName`, ''),
  set(state`app.currentBin.newFileIsEntry`, false),
  set(state`app.currentBin.showNewFileInput`, false),
  updateFirebaseBin([
    'showNewFileInput',
    'newFileIsEntry',
    'newFileName'
  ])
]

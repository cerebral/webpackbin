import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import showFile from '../actions/showFile'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default [
  showFile,
  set(state`app.currentBin.showFolder`, false),
  updateFirebaseBin(['selectedFileIndex', 'showFolder'])
]

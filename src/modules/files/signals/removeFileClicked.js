import isSelectedFile from '../actions/isSelectedFile'
import setNewSelectedFileIndex from '../actions/setNewSelectedFileIndex'
import {splice} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import setRemoveFileUndo from '../actions/setRemoveFileUndo'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  setRemoveFileUndo,
  splice(state`app.currentBin.files`, props`index`, 1),
  isSelectedFile, {
    true: [
      setNewSelectedFileIndex,
      showSnackbar('Removed file', 5000)
    ],
    false: []
  },
  updateFirebaseBin([
    'files',
    'selectedFileIndex'
  ])
]

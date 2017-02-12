import {set} from 'cerebral/operators'
import {state, string} from 'cerebral/tags'
import addFile from '../actions/addFile'
import selectNewFile from '../actions/selectNewFile'
import isValidFile from '../actions/isValidFile'
import showSnackbar from 'modules/app/factories/showSnackbar'
import updateFirebaseBin from 'modules/bin/factories/updateFirebaseBin'

export default [
  isValidFile, {
    true: [
      addFile,
      set(state`bin.currentBin.newFileName`, ''),
      set(state`bin.currentBin.newFileIsEntry`, false),
      set(state`bin.currentBin.showNewFileInput`, false),
      selectNewFile,
      ...updateFirebaseBin([
        'files',
        'selectedFileIndex',
        'newFileIsEntry',
        'showNewFileInput'
      ])
    ],
    false: [
      ...showSnackbar(
        string`"${state`bin.currentBin.newFileName`}" is not a valid filename`,
        5000,
        'error'
      )
    ]
  }
]

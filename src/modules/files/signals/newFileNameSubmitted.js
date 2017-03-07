import {set} from 'cerebral/operators'
import {state, string} from 'cerebral/tags'
import addFile from '../actions/addFile'
import selectNewFile from '../actions/selectNewFile'
import isValidFile from '../actions/isValidFile'
import showSnackbar from 'modules/app/factories/showSnackbar'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import requiresLoader from '../actions/requiresLoader'
import setLoader from '../actions/setLoader'

export default [
  isValidFile, {
    true: [
      addFile,
      set(state`app.currentBin.newFileName`, ''),
      set(state`app.currentBin.newFileIsEntry`, false),
      set(state`app.currentBin.showNewFileInput`, false),
      selectNewFile,
      requiresLoader, {
        true: [
          setLoader,
          updateFirebaseBin([
            'files',
            'selectedFileIndex',
            'newFileIsEntry',
            'showNewFileInput',
            'loaders'
          ])
        ],
        false: updateFirebaseBin([
          'files',
          'selectedFileIndex',
          'newFileIsEntry',
          'showNewFileInput'
        ])
      }
    ],
    false: showSnackbar(
      string`"${state`app.currentBin.newFileName`}" is not a valid filename`,
      5000,
      'error'
    )
  }
]

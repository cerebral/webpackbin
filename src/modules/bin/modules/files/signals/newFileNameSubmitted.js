import {set} from 'cerebral/operators'
import {state, string, input} from 'cerebral/tags'
import addFile from '../actions/addFile'
import selectNewFile from '../actions/selectNewFile'
import isValidFile from '../actions/isValidFile'
import updateBin from 'modules/bin/chains/updateBin'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  isValidFile, {
    true: [
      addFile,
      set(state`bin.files.newFileName`, ''),
      set(state`bin.files.newFileIsEntry`, false),
      set(state`bin.files.showNewFileInput`, false),
      selectNewFile,
      ...updateBin
    ],
    false: [
      ...showSnackbar(
        string`"${state`bin.files.newFileName`}" is not a valid filename`,
        5000,
        'error'
      )
    ]
  }
]

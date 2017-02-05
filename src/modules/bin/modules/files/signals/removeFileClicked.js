import isSelectedFile from '../actions/isSelectedFile'
import setNewSelectedFileIndex from '../actions/setNewSelectedFileIndex'
import updateSandbox from 'modules/bin/chains/updateSandbox'
import {splice} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'

export default [
  splice(state`bin.files.list`, input`index`, 1),
  isSelectedFile, {
    true: [
      setNewSelectedFileIndex
    ],
    false: []
  },
  ...updateSandbox
]

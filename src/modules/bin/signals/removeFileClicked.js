import isSelectedFile from '../actions/isSelectedFile'
import setNewSelectedFileIndex from '../actions/setNewSelectedFileIndex'
import updateBin from '../chains/updateBin'
import {splice} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'

export default [
  splice(state`bin.files`, input`index`, 1),
  isSelectedFile, {
    true: [
      setNewSelectedFileIndex
    ],
    false: []
  },
  ...updateBin
]

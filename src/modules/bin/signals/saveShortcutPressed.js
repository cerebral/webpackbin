import updateBin from '../chains/updateBin'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`bin.files.changedFiles`, {}),
  ...updateBin
]

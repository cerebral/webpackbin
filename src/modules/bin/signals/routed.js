import updateBin from '../chains/updateBin'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  ...updateBin,
  set(state`bin.isLoading`, false)
]

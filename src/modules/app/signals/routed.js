import updateSandbox from 'modules/bin/chains/updateSandbox'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  ...updateSandbox,
  set(state`bin.isLoading`, false)
]

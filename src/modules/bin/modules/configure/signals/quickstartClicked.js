import updateBinWithTemplate from '../actions/updateBinWithTemplate'
import updateSandbox from 'modules/bin/chains/updateSandbox'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  updateBinWithTemplate,
  set(state`bin.showConfiguration`, false),
  ...updateSandbox
]

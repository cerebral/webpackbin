import updateBinWithTemplate from '../actions/updateBinWithTemplate'
import updateSandbox from 'modules/bin/chains/updateSandbox'
import forceCodeUpdate from 'modules/bin/actions/forceCodeUpdate'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  updateBinWithTemplate,
  set(state`bin.currentBin.showConfiguration`, false),
  forceCodeUpdate,
  ...updateSandbox
]

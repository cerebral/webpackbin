import updateBinWithTemplate from '../actions/updateBinWithTemplate'
import updateSandbox from 'modules/sandbox/chains/updateSandbox'
import forceCodeUpdate from 'modules/code/actions/forceCodeUpdate'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  updateBinWithTemplate,
  set(state`app.currentBin.showConfiguration`, false),
  forceCodeUpdate,
  ...updateSandbox
]

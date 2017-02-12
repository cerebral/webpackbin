import {toggle, set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from '../factories/updateFirebaseBin'

export default [
  toggle(state`bin.currentBin.showLog`),
  set(state`bin.shouldCheckLog`, false),
  ...updateFirebaseBin('showLog')
]

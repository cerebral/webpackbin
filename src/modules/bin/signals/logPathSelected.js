import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebaseBin from '../factories/updateFirebaseBin'

export default [
  set(state`bin.currentBin.selectedLogPath`, props`path`),
  ...updateFirebaseBin('selectedLogPath')
]

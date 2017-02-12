import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`bin.currentBin.showConfiguration`, true)
]

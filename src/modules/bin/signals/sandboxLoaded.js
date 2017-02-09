import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`bin.isLoadingSandbox`, false),
  set(state`bin.showIsLoadingSandbox`, false)
]

import {toggle, set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  toggle(state`bin.showLog`),
  set(state`bin.shouldCheckLog`, false)
]

import {toggle} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  toggle(state`bin.showFullLog`)
]

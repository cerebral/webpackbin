import {unset} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'

export default [
  unset(state`bin.currentBin.packages.${input`packageName`}`)
]

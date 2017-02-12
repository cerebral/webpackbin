import {unset} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

export default [
  unset(state`bin.currentBin.packages.${props`packageName`}`)
]

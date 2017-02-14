import {unset} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

export default [
  unset(state`app.currentBin.packages.${props`packageName`}`)
]

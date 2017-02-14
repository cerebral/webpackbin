import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`sandbox.isLoadingSandbox`, false),
  set(state`sandbox.showIsLoadingSandbox`, false),
  set(state`sandbox.showIsPackaging`, false),
  set(state`app.isLoading`, false)
]

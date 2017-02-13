import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import saveClicked from './saveClicked'

export default [
  set(state`bin.currentBinKey`, null),
  set(state`bin.currentBin.owner`, state`app.user.uid`),
  set(state`app.isMainMenuOpen`, false),
  ...saveClicked
]

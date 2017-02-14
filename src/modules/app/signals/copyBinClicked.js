import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import saveClicked from './saveClicked'

export default [
  set(state`app.currentBinKey`, null),
  set(state`app.currentBin.owner`, state`app.user.uid`),
  set(state`app.isMainMenuOpen`, false),
  ...saveClicked
]

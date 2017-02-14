import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`app.currentBin.showConfiguration`, false),
  set(state`app.isMainMenuOpen`, false),
  set(state`app.isProfileMenuOpen`, false),
  set(state`app.profileMenuPage`, null)
]

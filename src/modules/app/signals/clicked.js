import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from '../factories/updateFirebaseBin'
import whenLiveCurrentUser from '../actions/whenLiveCurrentUser'

export default [
  set(state`app.currentBin.showConfiguration`, false),
  set(state`app.isMainMenuOpen`, false),
  set(state`app.isProfileMenuOpen`, false),
  set(state`app.isFilesMenuOpen`, false),
  set(state`app.profileMenuPage`, null),
  set(state`app.mainMenuPage`, null),
  whenLiveCurrentUser, {
    true: updateFirebaseBin('showConfiguration'),
    false: []
  }
]

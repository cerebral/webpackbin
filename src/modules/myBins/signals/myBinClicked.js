import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import redirectToBin from 'modules/app/factories/redirectToBin'

export default [
  set(state`app.isProfileMenuOpen`, false),
  set(state`app.profileMenuPage`, null),
  redirectToBin(props`binKey`)
]

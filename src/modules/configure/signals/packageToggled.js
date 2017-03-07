import {unset} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'

export default [
  unset(state`app.currentBin.packages.${props`packageName`}`),
  whenLiveCurrentUser, {
    true: updateFirebaseBin('packages'),
    false: []
  }
]

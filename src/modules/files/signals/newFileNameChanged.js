import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default [
  set(state`app.currentBin.newFileName`, props`value`),
  whenLiveCurrentUser, {
    true: updateFirebaseBin('newFileName'),
    false: []
  }
]

import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebasebin from 'modules/app/factories/updateFirebasebin'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'

export default [
  set(state`app.currentBin.showConfiguration`, true),
  whenLiveCurrentUser, {
    true: [
      ...updateFirebasebin('showConfiguration')
    ],
    false: []
  }
]

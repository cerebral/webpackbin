import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebasebin from 'modules/app/factories/updateFirebasebin'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'

export default [
  set(state`app.currentBin.packageQuery`, props`query`),
  whenLiveCurrentUser, {
    true: [
      ...updateFirebasebin('packageQuery')
    ],
    false: []
  }
]

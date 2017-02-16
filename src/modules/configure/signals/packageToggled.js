import {unset} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebasebin from 'modules/app/factories/updateFirebasebin'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'

export default [
  unset(state`app.currentBin.packages.${props`packageName`}`),
  whenLiveCurrentUser, {
    true: [
      ...updateFirebasebin('packages')
    ],
    false: []
  }
]

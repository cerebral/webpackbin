import {when, set, unset} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebasebin from 'modules/app/factories/updateFirebasebin'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'

export default [
  when(state`app.currentBin.loaders.${props`loaderName`}`), {
    true: [
      unset(state`app.currentBin.loaders.${props`loaderName`}`)
    ],
    false: [
      set(state`app.currentBin.loaders.${props`loaderName`}`, true)
    ]
  },
  whenLiveCurrentUser, {
    true: [
      ...updateFirebasebin('loaders')
    ],
    false: []
  }
]

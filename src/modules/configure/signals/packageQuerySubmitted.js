import getNpmPackage from '../actions/getNpmPackage'
import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import updateFirebasebin from 'modules/app/factories/updateFirebasebin'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'

export default [
  set(state`configure.isQueryingPackage`, true),
  getNpmPackage, {
    success: [
      set(state`app.currentBin.packages.${props`result.name`}`, props`result.version`),
      set(state`app.currentBin.packageQuery`, ''),
      whenLiveCurrentUser, {
        true: [
          ...updateFirebasebin(['packages', 'packageQuery'])
        ],
        false: []
      }
    ],
    error: [
      ...showSnackbar('Could not grab package, is it valid?', 5000, 'error')
    ]
  },
  set(state`configure.isQueryingPackage`, false)
]

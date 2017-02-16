import changeLoaderConfig from '../actions/changeLoaderConfig'
import updateFirebasebin from 'modules/app/factories/updateFirebasebin'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'

export default [
  changeLoaderConfig,
  whenLiveCurrentUser, {
    true: [
      ...updateFirebasebin('loaders')
    ],
    false: []
  }
]

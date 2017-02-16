import changeLoaderConfig from '../actions/changeLoaderConfig'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import whenLiveCurrentUser from 'modules/app/actions/whenLiveCurrentUser'

export default [
  changeLoaderConfig,
  whenLiveCurrentUser, {
    true: [
      ...updateFirebaseBin('loaders')
    ],
    false: []
  }
]

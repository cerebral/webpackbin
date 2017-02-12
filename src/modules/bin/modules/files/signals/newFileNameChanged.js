import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import whenLiveCurrentUser from 'modules/bin/actions/whenLiveCurrentUser'
import updateFirebaseBin from 'modules/bin/factories/updateFirebaseBin'

export default [
  set(state`bin.currentBin.newFileName`, props`value`),
  whenLiveCurrentUser, {
    true: [
      ...updateFirebaseBin('newFileName')
    ],
    false: []
  }
]

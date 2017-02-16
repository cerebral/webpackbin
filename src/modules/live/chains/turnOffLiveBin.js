import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default [
  set(state`app.currentBin.isLive`, false),
  ...updateFirebaseBin('isLive')
]

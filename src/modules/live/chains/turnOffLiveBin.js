import {sequence} from 'cerebral'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default sequence('turnOffLiveBin', [
  set(state`app.currentBin.isLive`, false),
  updateFirebaseBin('isLive')
])

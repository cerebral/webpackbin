import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default [
  set(state`app.currentBin.selectedLogPath`, props`path`),
  ...updateFirebaseBin('selectedLogPath')
]

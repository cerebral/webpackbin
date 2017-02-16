import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebasebin from 'modules/app/factories/updateFirebasebin'

export default [
  set(state`app.currentBin.isLive`, false),
  ...updateFirebasebin('isLive')
]

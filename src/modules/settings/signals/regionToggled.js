import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebaseSettings from '../factories/updateFirebaseSettings'
import updateSandbox from 'modules/sandbox/factories/updateSandbox'

export default [
  set(state`settings.region`, props`region`),
  ...updateSandbox([
    ...updateFirebaseSettings('region')
  ])
]

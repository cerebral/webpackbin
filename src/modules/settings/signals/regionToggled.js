import {set} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import updateFirebaseSettings from '../factories/updateFirebaseSettings'

export default [
  set(state`settings.region`, props`region`),
  ...updateFirebaseSettings('region')
]

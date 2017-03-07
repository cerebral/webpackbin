import {toggle} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseSettings from '../factories/updateFirebaseSettings'

export default [
  toggle(state`settings.lint`),
  updateFirebaseSettings('lint')
]

import {redirect} from 'cerebral-router'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`app.isMainMenuOpen`, false),
  redirect('/')
]

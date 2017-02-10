import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  set(state`bin.showConfiguration`, false),
  set(state`app.leftMenuIsOpened`, false),
  set(state`app.profileMenuIsOpened`, false)
]

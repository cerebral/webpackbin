import {set, when} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import saveClicked from 'modules/app/signals/saveClicked'

export default [
  set(state`code.isLinting`, false),
  set(state`code.isValid`, props`isValid`),
  when(state`code.saveWhenDoneLinting`), {
    true: [
      set(state`code.saveWhenDoneLinting`, false),
      saveClicked
    ],
    false: []
  }
]

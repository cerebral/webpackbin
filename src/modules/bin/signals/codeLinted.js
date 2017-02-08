import {set, when} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'
import saveClicked from './saveClicked'

export default [
  set(state`bin.isLinting`, false),
  set(state`bin.isValid`, input`isValid`),
  when(state`bin.saveWhenDoneLinting`), {
    true: [
      ...saveClicked
    ],
    false: []
  }
]

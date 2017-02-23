import {toggle, set, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default [
  toggle(state`app.currentBin.showLog`),
  when(state`app.currentBin.showLog`), {
    true: [
      set(state`app.showSandbox`, true)
    ],
    false: []
  },
  set(state`log.shouldCheckLog`, false),
  ...updateFirebaseBin('showLog')
]

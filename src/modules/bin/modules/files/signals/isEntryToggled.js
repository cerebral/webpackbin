import {toggle} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from 'modules/bin/factories/updateFirebaseBin'

export default [
  toggle(state`bin.currentBin.newFileIsEntry`),
  ...updateFirebaseBin('newFileIsEntry')
]

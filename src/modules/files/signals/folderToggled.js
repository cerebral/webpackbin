import {toggle} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default [
  toggle(state`app.currentBin.showFolder`),
  updateFirebaseBin('showFolder')
]

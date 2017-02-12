import {set, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import saveClicked from '../signals/saveClicked'
import addOwnerAsParticipant from '../actions/addOwnerAsParticipant'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  ...showSnackbar('Creating live session...'),
  set(state`bin.currentBin.isLive`, true),
  set(state`bin.currentBin.currentParticipantKey`, state`app.user.uid`),
  addOwnerAsParticipant,
  when(state`bin.currentBinKey`), {
    true: [],
    false: [
      ...saveClicked
    ]
  }
]

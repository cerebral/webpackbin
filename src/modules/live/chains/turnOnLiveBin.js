import {sequence} from 'cerebral'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import saveClicked from 'modules/app/signals/saveClicked'
import addOwnerAsParticipant from '../actions/addOwnerAsParticipant'
import showSnackbar from 'modules/app/factories/showSnackbar'
import connectLiveBinAsOwner from '../chains/connectLiveBinAsOwner'

export default sequence('turnOnLiveBin', [
  showSnackbar('Creating live session...'),
  set(state`app.currentBin.isLive`, true),
  set(state`app.currentBin.currentParticipantKey`, state`app.user.uid`),
  addOwnerAsParticipant,
  set(state`app.currentBinKey`, null),
  set(state`app.currentBin.owner`, state`app.user.uid`),
  saveClicked,
  connectLiveBinAsOwner
])

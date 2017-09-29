import {sequence} from 'cerebral'
import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import listenToBinUpdates from '../actions/listenToBinUpdates'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import showSnackbar from 'modules/app/factories/showSnackbar'
import updateSandbox from 'modules/sandbox/factories/updateSandbox'

export default sequence('connectLiveBinAsOwner', [
  listenToBinUpdates,
  updateFirebaseBin([
    'isLive',
    'currentParticipantKey',
    'participants'
  ], {
    success: updateSandbox([
      set(state`app.isLoading`, false),
      showSnackbar('Live session created, awaiting connections...', 5000)
    ]),
    error: showSnackbar('Unable to create live session', 5000, 'error'),
    notAllowed: []
  })
])

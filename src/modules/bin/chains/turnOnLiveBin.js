import showSnackbar from 'modules/app/factories/showSnackbar'
import listenToBinUpdates from '../actions/listenToBinUpdates'
import {set, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import updateFirebaseBin from '../factories/updateFirebaseBin'
import saveClicked from '../signals/saveClicked'

export default [
  set(state`bin.currentBin.isLive`, true),
  set(state`bin.currentBin.currentParticipantKey`, state`app.user.uid`),
  when(state`bin.currentBinKey`), {
    true: [],
    false: [
      ...saveClicked
    ]
  },
  ...updateFirebaseBin([
    'isLive',
    'currentParticipantKey'
  ], {
    success: [
      listenToBinUpdates,
      ...showSnackbar('Live session created, awaiting connections...', 5000)
    ],
    error: [
      ...showSnackbar('Unable to create live session', 5000, 'error')
    ]
  })
]

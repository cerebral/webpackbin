import showSnackbar from 'modules/app/factories/showSnackbar'
import updateSandbox from 'modules/sandbox/chains/updateSandbox'
import participateLiveBin from '../actions/participateLiveBin'
import listenToBinUpdates from '../actions/listenToBinUpdates'
import {set} from 'cerebral/operators'
import {state, string} from 'cerebral/tags'
import {setOnDisconnect} from 'cerebral-provider-firebase'

export default [
  [
    setOnDisconnect(string`bins.${state`app.currentBinKey`}.participants.${state`app.user.uid`}`, null),
    listenToBinUpdates,
    participateLiveBin, {
      success: [
        set(state`app.isLoading`, false),
        ...updateSandbox,
        ...showSnackbar('Joined live session', 5000)
      ],
      false: [
        set(state`app.isLoading`, false),
        ...showSnackbar('Unable to join live session', 5000, 'error')
      ]
    }
  ]
]

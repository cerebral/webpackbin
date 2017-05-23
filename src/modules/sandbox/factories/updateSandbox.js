import {parallel} from 'cerebral'
import updateSandbox from '../actions/updateSandbox'
import {set} from 'cerebral/operators'
import sandboxDebounce from '../sandboxDebounce'
import showTimedSandboxMessages from './showTimedSandboxMessages'
import {state} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import setLastSavedDatetime from 'modules/app/actions/setLastSavedDatetime'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'
import resetLogs from 'modules/log/actions/resetLogs'

export default function updateSandboxFactory (additionalChain = []) {
  return [
    set(state`sandbox.isUpdatingSandbox`, true),
    resetLogs,
    parallel([
      showTimedSandboxMessages([{
        time: 500,
        message: 'Sending update...'
      }, {
        time: 2000,
        message: 'Waiting for packager, hold on...'
      }, {
        time: 15000,
        message: 'Still waiting, you probably added a rather large set of packages...'
      }, {
        time: 15000,
        message: 'It can actually take over a minute to package up, please hold on some more...'
      }, {
        time: 15000,
        message: 'I will error out if this takes more than 2 minutes, though please keep holding, will normally be done very soon :)'
      }]),
      updateSandbox, {
        success: [
          setLastSavedDatetime,
          set(state`sandbox.isUpdatingSandbox`, false),
          set(state`sandbox.isLoadingSandbox`, true),
          sandboxDebounce(0), {
            continue: set(state`sandbox.sandboxMessage`, 'Loading sandbox...'),
            discard: []
          },
          updateFirebaseBin('lastSavedDatetime')
        ],
        error: [
          sandboxDebounce(0), {
            continue: set(state`sandbox.sandboxMessage`, 'Loading sandbox...'),
            discard: []
          },
          set(state`sandbox.isUpdatingSandbox`, false),
          set(state`sandbox.isLoadingSandbox`, false),
          set(state`sandbox.sandboxMessage`, null),
          set(state`app.isLoading`, false),
          showSnackbar('Sorry, something went wrong, please report or refresh', 5000, 'error')
        ]
      },
      additionalChain
    ])
  ]
}

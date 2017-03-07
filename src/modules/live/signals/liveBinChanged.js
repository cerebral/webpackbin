import whenLiveParticipant from 'modules/app/actions/whenLiveParticipant'
import updateSandbox from 'modules/sandbox/factories/updateSandbox'
import {set, equals, when} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import setPackagesFromLive from '../actions/setPackagesFromLive'
import setLoadersFromLive from '../actions/setLoadersFromLive'
import forceCodeUpdate from 'modules/code/actions/forceCodeUpdate'
import resetChangedFiles from 'modules/files/actions/resetChangedFiles'
import stopListeningToBinUpdates from '../actions/stopListeningToBinUpdates'
import {cancelOnDisconnect} from 'cerebral-provider-firebase/operators'

export default [
  whenLiveParticipant, {
    true: [
      equals(props`key`), {
        changedFiles: set(state`app.currentBin.changedFiles`, props`value`),
        lastSavedDatetime: [
          set(state`app.showSandbox`, true),
          updateSandbox()
        ],
        newFileIsEntry: set(state`app.currentBin.newFileIsEntry`, props`value`),
        newFileName: set(state`app.currentBin.newFileName`, props`value`),
        selectedFileIndex: set(state`app.currentBin.selectedFileIndex`, props`value`),
        showFullLog: set(state`app.currentBin.showFullLog`, props`value`),
        showLog: set(state`app.currentBin.showLog`, props`value`),
        showNewFileInput: set(state`app.currentBin.showNewFileInput`, props`value`),
        showConfiguration: set(state`app.currentBin.showConfiguration`, props`value`),
        currentLoader: set(state`app.currentBin.currentLoader`, props`value`),
        packageQuery: set(state`app.currentBin.packageQuery`, props`value`),
        packages: setPackagesFromLive,
        loaders: setLoadersFromLive,
        files: [
          resetChangedFiles,
          set(state`app.currentBin.files`, props`value`),
          forceCodeUpdate
        ],
        selectedLogPath: set(state`app.currentBin.selectedLogPath`, props`value`),
        currentParticipantKey: set(state`app.currentBin.currentParticipantKey`, props`value`),
        participants: set(state`app.currentBin.participants`, props`value`),
        isLive: [
          when(props`value`), {
            true: [],
            false: [
              set(state`app.currentBin.isLive`, false),
              stopListeningToBinUpdates,
              cancelOnDisconnect
            ]
          }
        ],
        otherwise: []
      }
    ],
    false: [
      equals(props`key`), {
        currentParticipantKey: set(state`app.currentBin.currentParticipantKey`, props`value`),
        participants: set(state`app.currentBin.participants`, props`value`),
        otherwise: []
      }
    ]
  }
]

import whenLiveParticipant from 'modules/app/actions/whenLiveParticipant'
import updateSandbox from 'modules/sandbox/chains/updateSandbox'
import {set, equals} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import setPackagesFromLive from '../actions/setPackagesFromLive'
import setLoadersFromLive from '../actions/setLoadersFromLive'
import resetChangedFiles from 'modules/files/actions/resetChangedFiles'

export default [
  whenLiveParticipant, {
    true: [
      equals(props`key`), {
        changedFiles: [
          set(state`app.currentBin.changedFiles`, props`value`)
        ],
        lastSavedDatetime: [
          ...updateSandbox
        ],
        newFileIsEntry: [
          set(state`app.currentBin.newFileIsEntry`, props`value`)
        ],
        newFileName: [
          set(state`app.currentBin.newFileName`, props`value`)
        ],
        selectedFileIndex: [
          set(state`app.currentBin.selectedFileIndex`, props`value`)
        ],
        showFullLog: [
          set(state`app.currentBin.showFullLog`, props`value`)
        ],
        showLog: [
          set(state`app.currentBin.showLog`, props`value`)
        ],
        showNewFileInput: [
          set(state`app.currentBin.showNewFileInput`, props`value`)
        ],
        packages: [
          setPackagesFromLive
        ],
        loaders: [
          setLoadersFromLive
        ],
        files: [
          resetChangedFiles,
          set(state`app.currentBin.files`, props`value`)
        ],
        selectedLogPath: [
          set(state`app.currentBin.selectedLogPath`, props`value`)
        ],
        currentParticipantKey: [
          set(state`app.currentBin.currentParticipantKey`, props`value`)
        ],
        participants: [
          set(state`app.currentBin.participants`, props`value`)
        ],
        otherwise: []
      }
    ],
    false: [
      equals(props`key`), {
        currentParticipantKey: [
          set(state`app.currentBin.currentParticipantKey`, props`value`)
        ],
        participants: [
          set(state`app.currentBin.participants`, props`value`)
        ],
        otherwise: []
      }
    ]
  }
]

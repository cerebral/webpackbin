import whenLiveParticipant from '../actions/whenLiveParticipant'
import updateSandbox from '../chains/updateSandbox'
import {set, equals} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import setPackagesFromLive from '../actions/setPackagesFromLive'
import setLoadersFromLive from '../actions/setLoadersFromLive'

export default [
  whenLiveParticipant, {
    true: [
      equals(props`key`), {
        changedFiles: [
          set(state`bin.currentBin.changedFiles`, props`value`)
        ],
        lastSavedDatetime: [
          ...updateSandbox
        ],
        newFileIsEntry: [
          set(state`bin.currentBin.newFileIsEntry`, props`value`)
        ],
        newFileName: [
          set(state`bin.currentBin.newFileName`, props`value`)
        ],
        selectedFileIndex: [
          set(state`bin.currentBin.selectedFileIndex`, props`value`)
        ],
        showFullLog: [
          set(state`bin.currentBin.showFullLog`, props`value`)
        ],
        showLog: [
          set(state`bin.currentBin.showLog`, props`value`)
        ],
        showNewFileInput: [
          set(state`bin.currentBin.showNewFileInput`, props`value`)
        ],
        packages: [
          setPackagesFromLive
        ],
        loaders: [
          setLoadersFromLive
        ],
        files: [
          set(state`bin.currentBin.changedFiles`, {}),
          set(state`bin.currentBin.files`, props`value`)
        ],
        logs: [
          set(state`bin.currentBin.logs`, props`value`)
        ],
        selectedLogPath: [
          set(state`bin.currentBin.selectedLogPath`, props`value`)
        ],
        currentParticipantKey: [
          set(state`bin.currentBin.currentParticipantKey`, props`value`)
        ],
        participants: [
          set(state`bin.currentBin.participants`, props`value`)
        ],
        otherwise: []
      }
    ],
    false: [
      equals(props`key`), {
        currentParticipantKey: [
          set(state`bin.currentBin.currentParticipantKey`, props`value`)
        ],
        participants: [
          set(state`bin.currentBin.participants`, props`value`)
        ],
        otherwise: []
      }
    ]
  }
]

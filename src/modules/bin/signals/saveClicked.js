import updateSandbox from '../chains/updateSandbox'
import updateBinFiles from '../actions/updateBinFiles'
import redirectToBin from '../factories/redirectToBin'
import isOwnerOfCurrentBin from '../actions/isOwnerOfCurrentBin'
import saveNewBin from '../actions/saveNewBin'
import showSnackbar from 'modules/app/factories/showSnackbar'
import {set, when} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'

export default [
  set(state`bin.files.changedFiles`, {}),
  [
    ...updateSandbox,
    when(state`bin.currentBin`), {
      true: [
        isOwnerOfCurrentBin, {
          true: [
            set(state`bin.isSaving`, true),
            updateBinFiles, {
              success: [],
              error: [
                ...showSnackbar('Could not save files', 5000, 'error')
              ]
            },
            set(state`bin.isSaving`, false)
          ],
          false: []
        }
      ],
      false: [
        set(state`bin.isSaving`, true),
        saveNewBin, {
          success: [
            set(state`bin.currentBin`, input`bin`),
            redirectToBin(input`bin.key`)
          ],
          error: [
            ...showSnackbar('Could not create new bin', 5000, 'error')
          ]
        },
        set(state`bin.isSaving`, false)
      ]
    }
  ]
]

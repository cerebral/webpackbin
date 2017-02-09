import updateSandbox from '../chains/updateSandbox'
import updateBin from '../actions/updateBin'
import redirectToBin from '../factories/redirectToBin'
import isOwnerOfCurrentBin from '../actions/isOwnerOfCurrentBin'
import saveNewBin from '../actions/saveNewBin'
import showSnackbar from 'modules/app/factories/showSnackbar'
import {set, when} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'

export default [
  when(state`bin.isLinting`), {
    true: [
      set(state`bin.saveWhenDoneLinting`, true)
    ],
    false: [
      when(state`bin.isValid`), {
        true: [
          set(state`bin.files.changedFiles`, {}),
          when(state`bin.currentBin.key`), {
            true: [
              isOwnerOfCurrentBin, {
                true: [
                  set(state`bin.isSaving`, true),
                  updateBin, {
                    success: [
                      ...updateSandbox
                    ],
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
        ],
        false: [
          ...showSnackbar('Code is not valid, check lint messages', 5000, 'error')
        ]
      }
    ]
  }
]

import updateSandbox from '../chains/updateSandbox'
import updateBin from '../actions/updateBin'
import updateLiveBin from '../chains/updateLiveBin'
import isOwnerOfCurrentBin from '../actions/isOwnerOfCurrentBin'
import showSnackbar from 'modules/app/factories/showSnackbar'
import createNewBin from '../chains/createNewBin'
import {set, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  when(state`bin.isLinting`), {
    true: [
      set(state`bin.saveWhenDoneLinting`, true)
    ],
    false: [
      when(state`bin.isValid`), {
        true: [
          set(state`bin.currentBin.changedFiles`, {}),
          when(state`bin.currentBinKey`), {
            true: [
              isOwnerOfCurrentBin, {
                true: [
                  when(state`bin.currentBin.isLive`), {
                    true: [
                      ...updateLiveBin
                    ],
                    false: [
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
                    ]
                  }
                ],
                false: [
                  when(state`bin.currentBin.isLive`), {
                    true: [
                      ...updateLiveBin
                    ],
                    false: [
                      // Create a copy of the current bin
                    ]
                  }
                ]
              }
            ],
            false: [
              set(state`bin.isSaving`, true),
              ...createNewBin,
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

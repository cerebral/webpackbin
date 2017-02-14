import updateSandbox from 'modules/sandbox/chains/updateSandbox'
import updateBin from '../actions/updateBin'
import updateLiveBin from 'modules/live/chains/updateLiveBin'
import isOwnerOfCurrentBin from '../actions/isOwnerOfCurrentBin'
import showSnackbar from '../factories/showSnackbar'
import createNewBin from '../chains/createNewBin'
import {set, when} from 'cerebral/operators'
import {state} from 'cerebral/tags'
import resetChangedFiles from 'modules/files/actions/resetChangedFiles'

export default [
  when(
    state`code.isLinting`,
    state`settings.lint`,
    (isLinting, lint) => isLinting && lint
  ), {
    true: [
      set(state`code.saveWhenDoneLinting`, true)
    ],
    false: [
      when(state`code.isValid`), {
        true: [
          resetChangedFiles,
          when(state`app.currentBinKey`), {
            true: [
              isOwnerOfCurrentBin, {
                true: [
                  when(state`app.currentBin.isLive`), {
                    true: [
                      ...updateLiveBin
                    ],
                    false: [
                      set(state`app.isSaving`, true),
                      updateBin, {
                        success: [
                          ...updateSandbox
                        ],
                        error: [
                          ...showSnackbar('Could not save files', 5000, 'error')
                        ]
                      },
                      set(state`app.isSaving`, false)
                    ]
                  }
                ],
                false: [
                  when(state`app.currentBin.isLive`), {
                    true: [
                      ...updateLiveBin
                    ],
                    false: [
                      set(state`app.currentBinKey`, null),
                      set(state`app.currentBin.owner`, state`app.user.uid`),
                      set(state`app.isSaving`, true),
                      ...createNewBin,
                      set(state`app.isSaving`, false)
                    ]
                  }
                ]
              }
            ],
            false: [
              set(state`app.isSaving`, true),
              ...createNewBin,
              set(state`app.isSaving`, false)
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

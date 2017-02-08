import updateSandbox from 'modules/bin/chains/updateSandbox'
import showSnackbar from '../factories/showSnackbar'
import setCurrentBin from 'modules/bin/actions/setCurrentBin'
import isCurrentBinKey from 'modules/bin/factories/isCurrentBinKey'
import forceCodeUpdate from 'modules/bin/actions/forceCodeUpdate'
import {set} from 'cerebral/operators'
import {state, input, string} from 'cerebral/tags'
import {value} from 'cerebral-provider-firebase'

export default [
  isCurrentBinKey(input`binKey`), {
    true: [],
    false: [
      set(state`bin.isLoading`, true),
      set(state`bin.isUpdatingSandbox`, true),
      value(string`bins.${input`binKey`}`), {
        success: [
          setCurrentBin,
          forceCodeUpdate,
          ...updateSandbox
        ],
        error: [
          ...showSnackbar('Unable to get BIN', 5000, 'error')
        ]
      },
      set(state`bin.isLoading`, false)
    ]
  }
]

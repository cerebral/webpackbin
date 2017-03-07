import {unset} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'
import removeMyBin from '../actions/removeMyBin'

export default [
  removeMyBin, {
    success: [
      unset(state`myBins.list.${props`myBinKey`}`),
      showSnackbar('Bin removed from my bins', 5000)
    ],
    error: showSnackbar('Could not remove bin from my bins', 5000, 'error')
  }
]

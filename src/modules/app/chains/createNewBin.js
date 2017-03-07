import {parallel} from 'cerebral'
import {props} from 'cerebral/tags'
import redirectToBin from '../factories/redirectToBin'
import saveNewBin from '../actions/saveNewBin'
import showSnackbar from '../factories/showSnackbar'
import updateCreatedStats from '../actions/updateCreatedStats'

export default parallel('createNewBin', [
  updateCreatedStats,
  saveNewBin, {
    success: redirectToBin(props`binKey`),
    error: showSnackbar('Could not create new bin', 5000, 'error')
  }
])

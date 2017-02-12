import toggleLogPath from '../actions/toggleLogPath'
import updateFirebaseBin from '../factories/updateFirebaseBin'

export default [
  toggleLogPath,
  ...updateFirebaseBin('selectedLogPath')
]

import toggleLogPath from '../actions/toggleLogPath'
import updateFirebaseBin from 'modules/app/factories/updateFirebaseBin'

export default [
  toggleLogPath,
  ...updateFirebaseBin('selectedLogPath')
]

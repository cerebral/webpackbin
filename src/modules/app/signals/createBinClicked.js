import resetCurrentBin from '../actions/resetCurrentBin'
import forceCodeUpdate from 'modules/code/actions/forceCodeUpdate'
import createNewBin from '../chains/createNewBin'
import appClicked from './clicked'

export default [
  resetCurrentBin,
  forceCodeUpdate,
  ...createNewBin,
  ...appClicked

]

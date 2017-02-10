import resetCurrentBin from 'modules/bin/actions/resetCurrentBin'
import forceCodeUpdate from 'modules/bin/actions/forceCodeUpdate'
import createNewBin from 'modules/bin/chains/createNewBin'
import appClicked from 'modules/app/signals/clicked'

export default [
  resetCurrentBin,
  forceCodeUpdate,
  ...createNewBin,
  ...appClicked

]

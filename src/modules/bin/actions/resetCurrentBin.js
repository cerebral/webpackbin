import {createNewBin} from 'utils'

function resetCurrentBin ({state}) {
  state.set('bin.currentBin', createNewBin(state.get('app.user.uid')))
}

export default resetCurrentBin

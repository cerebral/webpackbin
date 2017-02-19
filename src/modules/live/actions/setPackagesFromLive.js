import {decodePackages} from 'utils'

function setPackagesFromLive ({input, state}) {
  state.set('app.currentBin.packages', decodePackages(input.value || {}))
}

export default setPackagesFromLive

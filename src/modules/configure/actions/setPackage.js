import {encodeKey} from 'utils'

function setPackage ({state, props}) {
  state.set(`app.currentBin.packages.${encodeKey(props.response.result.name)}`, props.response.result.version)
}

export default setPackage

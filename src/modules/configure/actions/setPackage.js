import {encodeKey} from 'utils'

function setPackage ({state, props}) {
  state.set(`app.currentBin.packages.${encodeKey(props.result.name)}`, props.result.version)
}

export default setPackage

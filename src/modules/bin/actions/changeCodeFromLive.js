import {transformCode} from 'utils'

function changeCodeFromLive ({props, state}) {
  const code = state.get(`bin.currentBin.files.${props.value.fileIndex}.content`)

  state.set(`bin.currentBin.files.${props.value.fileIndex}.content`, transformCode(code, props.value))
}

export default changeCodeFromLive

import {transformCode} from 'utils'

function changeCode ({input, state}) {
  const selectedFileIndex = state.get('bin.selectedFileIndex')
  const code = state.get(`bin.files.${selectedFileIndex}.content`)
  const file = state.get(`bin.files.${selectedFileIndex}`)

  state.set(`bin.files.${selectedFileIndex}.content`, transformCode(code, input))
}

export default changeCode

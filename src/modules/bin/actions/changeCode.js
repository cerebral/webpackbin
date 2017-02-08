import {transformCode} from 'utils'

function changeCode ({input, state}) {
  const selectedFileIndex = state.get('bin.files.selectedFileIndex')
  const code = state.get(`bin.currentBin.files.${selectedFileIndex}.content`)
  const file = state.get(`bin.currentBin.files.${selectedFileIndex}`)

  state.set(`bin.currentBin.files.${selectedFileIndex}.content`, transformCode(code, input))
  state.set(`bin.currentBin.files.${selectedFileIndex}.lastCursorPosition`, {
    line: input.to.line,
    ch: input.to.ch
  })
}

export default changeCode

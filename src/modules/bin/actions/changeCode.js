import {transformCode} from 'utils'

function changeCode ({props, state}) {
  const selectedFileIndex = props.codeChange.fileIndex || state.get('bin.currentBin.selectedFileIndex')
  const code = state.get(`bin.currentBin.files.${selectedFileIndex}.content`)

  state.set(`bin.currentBin.files.${selectedFileIndex}.content`, transformCode(code, props.codeChange))
  state.set(`bin.currentBin.files.${selectedFileIndex}.lastCursorPosition`, {
    line: props.codeChange.to.line,
    ch: props.codeChange.to.ch
  })
}

export default changeCode

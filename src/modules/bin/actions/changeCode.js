import {transformCode} from 'utils'

function changeCode ({input, state}) {
  const selectedFileIndex = state.get('bin.files.selectedFileIndex')
  const code = state.get(`bin.files.list.${selectedFileIndex}.content`)
  const file = state.get(`bin.files.list.${selectedFileIndex}`)

  state.set(`bin.files.list.${selectedFileIndex}.content`, transformCode(code, input))
  state.set(`bin.files.list.${selectedFileIndex}.lastCursorPosition`, {
    line: input.to.line,
    ch: input.to.ch
  })
}

export default changeCode

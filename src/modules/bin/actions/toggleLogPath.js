function toggleLogPath ({input, state}) {
  state.set(`bin.logs.${input.path.join('.')}.isCollapsed`, !state.get(`bin.logs.${input.path.join('.')}.isCollapsed`))
  state.set('bin.selectedLogPath', input.path)
}

export default toggleLogPath

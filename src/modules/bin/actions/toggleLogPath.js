function toggleLogPath ({props, state}) {
  state.set(`bin.logs.${props.path.join('.')}.isCollapsed`, !state.get(`bin.logs.${props.path.join('.')}.isCollapsed`))
  state.set('bin.currentBin.selectedLogPath', props.path)
}

export default toggleLogPath

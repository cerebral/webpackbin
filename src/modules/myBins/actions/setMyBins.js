function setMyBins ({props, state}) {
  state.set('myBins.list', props.value || {})
}

export default setMyBins

function setMyBins ({props, state}) {
  state.set('app.myBins', props.value || {})
}

export default setMyBins

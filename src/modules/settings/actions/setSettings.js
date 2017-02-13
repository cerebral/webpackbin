function setSettings ({props, state}) {
  if (props.value) {
    state.merge('settings', props.value)
  }
}

export default setSettings

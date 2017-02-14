function setBoilerplates ({props, state}) {
  state.set('boilerplates.list', props.value || {})
}

export default setBoilerplates

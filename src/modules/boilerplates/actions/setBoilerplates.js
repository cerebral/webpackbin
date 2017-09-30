function setBoilerplates({ props, state }) {
  state.set('boilerplates.list', props.response.value || {});
}

export default setBoilerplates;

function setSettings({ props, state }) {
  if (props.response.value) {
    state.merge('settings', props.response.value);
  }
}

export default setSettings;

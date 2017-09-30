function setCurrentBin({ props, state }) {
  state.set('app.currentBinKey', props.response.key);
  state.set(
    'app.currentBin',
    Object.assign(props.response.value, {
      packages: props.response.value.packages || {},
      loaders: props.response.value.loaders || {},
      changedFiles: props.response.value.changedFiles || {},
    })
  );
  state.set('sandbox.url', null);
}

export default setCurrentBin;

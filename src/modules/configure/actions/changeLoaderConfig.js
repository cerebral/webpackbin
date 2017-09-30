function changeLoaderConfig({ props, state }) {
  const loaderType = typeof state.get(
    `app.currentBin.loaders.${props.loaderName}`
  );

  if (loaderType === 'object' && props.configValue !== false) {
    state.set(
      `app.currentBin.loaders.${props.loaderName}.${props.configName}`,
      props.configValue
    );
  } else if (loaderType === 'boolean' && props.configValue !== false) {
    state.set(`app.currentBin.loaders.${props.loaderName}`, {
      [props.configName]: props.configValue,
    });
  } else {
    state.unset(
      `app.currentBin.loaders.${props.loaderName}.${props.configName}`
    );

    if (
      Object.keys(state.get(`app.currentBin.loaders.${props.loaderName}`))
        .length === 0
    ) {
      state.set(`app.currentBin.loaders.${props.loaderName}`, true);
    }
  }
}

export default changeLoaderConfig;

function changeLoaderConfig ({input, state}) {
  const loaderType = typeof state.get(`bin.currentBin.loaders.${input.loaderName}`)

  if (loaderType === 'object' && input.configValue !== false) {
    state.set(`bin.currentBin.loaders.${input.loaderName}.${input.configName}`, input.configValue)
  } else if (loaderType === 'boolean' && input.configValue !== false) {
    state.set(`bin.currentBin.loaders.${input.loaderName}`, {
      [input.configName]: input.configValue
    })
  } else {
    state.unset(`bin.currentBin.loaders.${input.loaderName}.${input.configName}`)

    if (Object.keys(state.get(`bin.currentBin.loaders.${input.loaderName}`)).length === 0) {
      state.set(`bin.currentBin.loaders.${input.loaderName}`, true)
    }
  }
}

export default changeLoaderConfig

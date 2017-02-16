function setLoader ({props, state}) {
  const loader = state.get(`app.currentBin.loaders.${props.loader}`)

  if (loader === true) {
    state.set(`app.currentBin.loaders.${props.loader}`, {
      [props.loaderProp]: true
    })
  } else if (loader) {
    state.set(`app.currentBin.loaders.${props.loader}.${props.loaderProp}`, true)
  } else {
    state.set(`app.currentBin.loaders.${props.loader}`, true)
  }
}

export default setLoader

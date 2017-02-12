function shouldCheckLog ({props, state}) {
  if (!state.get('bin.currentBin.showLog') && props.log && props.log.__webpackbin_type_error) {
    state.set('bin.shouldCheckLog', true)
  }
}

export default shouldCheckLog

function shouldCheckLog({ props, state }) {
  if (
    !state.get('app.currentBin.showLog') &&
    props.log &&
    props.log.__webpackbin_type_error
  ) {
    state.set('log.shouldCheckLog', true);
  }
}

export default shouldCheckLog;

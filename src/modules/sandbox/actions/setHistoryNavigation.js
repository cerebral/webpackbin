function setHistoryNavigation({ props, state }) {
  state.set('sandbox.lastNavigation', {
    type: props.type,
  });
}

export default setHistoryNavigation;

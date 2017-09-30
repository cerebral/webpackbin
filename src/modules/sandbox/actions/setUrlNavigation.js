function setHashNavigation({ state }) {
  state.set('sandbox.lastNavigation', {
    type: 'url',
    value: state.get('sandbox.url'),
  });
}

export default setHashNavigation;

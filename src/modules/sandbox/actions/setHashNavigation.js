function setHashNavigation ({state}) {
  state.set('sandbox.lastNavigation', {
    type: 'hash',
    value: state.get('sandbox.hash')
  })
}

export default setHashNavigation

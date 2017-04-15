function setFavorites ({props, state}) {
  state.set('favorites.list', props.value || {})
}

export default setFavorites

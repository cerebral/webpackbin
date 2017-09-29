function setFavorites ({props, state}) {
  state.set('favorites.list', props.response.value || {})
}

export default setFavorites

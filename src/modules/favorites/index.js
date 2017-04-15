import addFavoriteClicked from './signals/addFavoriteClicked'
import favoritesClicked from './signals/favoritesClicked'
import favoriteTitleAborted from './signals/favoriteTitleAborted'
import favoriteTitleChanged from './signals/favoriteTitleChanged'
import favoriteTitleSubmitted from './signals/favoriteTitleSubmitted'
import favoriteClicked from './signals/favoriteClicked'

export default {
  state: {
    list: {},
    showNewTitleInput: false,
    newMyBinTitle: ''
  },
  signals: {
    addFavoriteClicked,
    favoriteTitleAborted,
    favoriteTitleChanged,
    favoriteTitleSubmitted,
    favoriteClicked,
    favoritesClicked
  }
}

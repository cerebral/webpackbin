import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'common/components/IconButton'
import Input from 'common/components/Input'
import styles from './styles.css'

import liveStatus from 'computed/liveStatus'
import isInFavorites from 'computed/isInFavorites'

export default connect({
  liveStatus,
  isInFavorites,
  currentBinKey: state`app.currentBinKey`,
  showNewTitleInput: state`favorites.showNewTitleInput`,
  newMyBinTitle: state`favorites.newMyBinTitle`,
  addFavoriteClicked: signal`favorites.addFavoriteClicked`,
  favoriteTitleChanged: signal`favorites.favoriteTitleChanged`,
  favoriteTitleSubmitted: signal`favorites.favoriteTitleSubmitted`,
  favoriteTitleAborted: signal`favorites.favoriteTitleAborted`
},
  class Favorite extends Component {
    componentDidUpdate (prevProps) {
      if (!prevProps.showNewFileInput && this.props.showNewFileInput) {
        this.focusInput()
      }
    }
    focusInput () {
      document.querySelector('#favoritesTitle').focus()
    }
    render () {
      const {
        liveStatus,
        isInFavorites,
        currentBinKey,
        showNewTitleInput,
        newMyBinTitle,
        addFavoriteClicked,
        favoriteTitleChanged,
        favoriteTitleSubmitted,
        favoriteTitleAborted
      } = this.props

      if (showNewTitleInput) {
        return (
          <div className={styles.wrapper}>
            <Input
              id='newFileName'
              autoFocus
              value={newMyBinTitle}
              onInput={(event) => favoriteTitleChanged({value: event.target.value})}
              onSubmit={favoriteTitleSubmitted}
              onCancel={favoriteTitleAborted}
              placeholder='Name the bin...'
            />
          </div>
        )
      }

      return (
        <div className={styles.wrapper}>
          <IconButton
            active={isInFavorites}
            disabled={liveStatus.isParticipant || !currentBinKey}
            onClick={() => addFavoriteClicked()}
            tooltip={isInFavorites ? 'Remove favorite' : 'Add favorite'}
            icon='favorite'
          />
        </div>
      )
    }
  }
)

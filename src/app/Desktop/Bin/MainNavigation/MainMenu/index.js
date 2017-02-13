import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import MenuItem from 'components/MenuItem'
import SideMenu from 'components/SideMenu'
import Icon from 'components/Icon'
import styles from './styles.css'

export default connect({
  currentBinKey: state`bin.currentBinKey`,
  isMainMenuOpen: state`app.isMainMenuOpen`,
  mainMenuButtonClicked: signal`app.mainMenuButtonClicked`,
  newBinClicked: signal`bin.newBinClicked`,
  copyBinClicked: signal`bin.copyBinClicked`
},
  function MainMenu ({
    isMainMenuOpen,
    currentBinKey,
    newBinClicked,
    mainMenuButtonClicked,
    copyBinClicked
  }) {
    return (
      <div>
        <Icon
          icon='menu'
          onClick={(e) => {
            e.stopPropagation()
            mainMenuButtonClicked()
          }}
        >
          Menu
        </Icon>
        <SideMenu
          side='left'
          show={isMainMenuOpen}
        >
          <div className={styles.logoWrapper}>
            <div className={styles.logo} />
          </div>
          <MenuItem
            icon='newBin'
            onClick={() => newBinClicked()}
            >
            New bin
          </MenuItem>
          <MenuItem
            disabled={!currentBinKey}
            icon='copyBin'
            onClick={() => copyBinClicked()}
            >
            Copy bin
          </MenuItem>
        </SideMenu>
      </div>
    )
  }
)

import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import MenuItem from 'common/components/MenuItem'
import SideMenu from 'common/components/SideMenu'
import Icon from 'common/components/Icon'
import Boilerplates from './Boilerplates'
import styles from './styles.css'

export default connect({
  currentBinKey: state`app.currentBinKey`,
  stats: state`app.stats`,
  isMainMenuOpen: state`app.isMainMenuOpen`,
  page: state`app.mainMenuPage`,
  mainMenuButtonClicked: signal`app.mainMenuButtonClicked`,
  newBinClicked: signal`app.newBinClicked`,
  copyBinClicked: signal`app.copyBinClicked`,
  boilerplatesClicked: signal`boilerplates.boilerplatesClicked`
},
  function MainMenu ({
    isMainMenuOpen,
    stats,
    page,
    currentBinKey,
    newBinClicked,
    mainMenuButtonClicked,
    copyBinClicked,
    boilerplatesClicked
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
          page={page}
          pages={[{
            name: 'boilerplates',
            content: Boilerplates
          }]}
        >
          <div className={styles.logoWrapper}>
            <div className={styles.logo} />
            <div className={styles.stats}>
              <div className={styles.stat}>
                <Icon icon='newBin' />
                <strong>{stats.createdCount}</strong> created
              </div>
              <div className={styles.stat}>
                <Icon icon='eye' />
                <strong>{stats.viewCount}</strong> views
              </div>
            </div>
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
          <MenuItem
            active={page === 'boilerplates'}
            icon='boilerplates'
            onClick={() => boilerplatesClicked()}
            >
            Boilerplates
          </MenuItem>
        </SideMenu>
      </div>
    )
  }
)

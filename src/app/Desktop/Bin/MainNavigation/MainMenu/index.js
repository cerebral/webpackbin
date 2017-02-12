import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import MenuItem from 'components/MenuItem'
import SideMenu from 'components/SideMenu'
import Icon from 'components/Icon'

export default connect({
  isMainMenuOpen: state`app.isMainMenuOpen`,
  mainMenuButtonClicked: signal`app.mainMenuButtonClicked`
},
  function MainMenu ({
    isMainMenuOpen,
    createBinClicked,
    mainMenuButtonClicked
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
          <MenuItem
            icon='addCourse'
            onClick={() => createBinClicked()}
            >
            Create bin
          </MenuItem>
        </SideMenu>
      </div>
    )
  }
)

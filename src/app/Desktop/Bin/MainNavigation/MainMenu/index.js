import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import MenuItem from 'components/MenuItem'
import SideMenu from 'components/SideMenu'
import Icon from 'components/Icon'

export default connect({
  mainMenuIsOpened: state`app.mainMenuIsOpened`,
  mainMenuButtonClicked: signal`app.mainMenuButtonClicked`
},
  function MainMenu ({
    mainMenuIsOpened,
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
          show={mainMenuIsOpened}
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

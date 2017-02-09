import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import NavigationBar from 'components/NavigationBar'
import IconButton from 'components/IconButton'
import Configure from './Configure'
import {state, signal} from 'cerebral/tags'

export default connect({
  isSaving: state`bin.isSaving`,
  showLog: state`bin.showLog`,
  shouldCheckLog: state`bin.shouldCheckLog`,
  saveClicked: signal`bin.saveClicked`,
  logToggled: signal`bin.logToggled`
},
  function MainNavigation ({
    isSaving,
    showLog,
    shouldCheckLog,
    saveClicked,
    logToggled
  }) {
    return (
      <NavigationBar>
        <div style={{width: '150px'}} />
        <IconButton
          disabled={isSaving}
          icon='save'
          tooltip='CTRL + s / CMD + s'
          onClick={() => saveClicked()}
        >
          Save
        </IconButton>
        <Configure />
        <IconButton
          active={showLog}
          notify={shouldCheckLog}
          icon='log'
          onClick={() => logToggled()}
        >
          Log
        </IconButton>
      </NavigationBar>
    )
  }
)

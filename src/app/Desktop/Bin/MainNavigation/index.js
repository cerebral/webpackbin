import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import NavigationBar from 'components/NavigationBar'
import IconButton from 'components/IconButton'
import Configure from './Configure'
import {state, signal} from 'cerebral/tags'

export default connect({
  isSaving: state`bin.isSaving`,
  saveClicked: signal`bin.saveClicked`
},
  function MainNavigation ({
    isSaving,
    saveClicked
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
      </NavigationBar>
    )
  }
)

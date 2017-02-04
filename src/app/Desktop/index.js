import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import NavigationBar from 'components/NavigationBar'

export default connect({

},
  function Desktop () {
    return (
      <div>
        <NavigationBar />
      </div>
    )
  }
)

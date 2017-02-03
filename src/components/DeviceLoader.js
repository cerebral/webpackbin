import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state} from 'cerebral/tags'

export default connect({
  media: state`useragent.media`
},
  class DeviceLoader extends Component {
    constructor (props) {
      super(props)

      this.state = {
        isLoading: true,
        device: null
      }
    }
    componentDidMount () {
      import('./Desktop')
        .then((module) => {
          this.setState({
            isLoading: false,
            device: module.default
          })
        })
    }
    componentDidUpdate (prevProps, prevState) {
      if (!prevState.device && this.state.device) {
        document.querySelector('#loader').style.display = 'none'
      }
    }
    render () {
      if (this.state.isLoading) {
        return null
      }

      var Device = this.state.device

      return <Device />
    }
  }
)

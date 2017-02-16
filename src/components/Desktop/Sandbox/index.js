import config from 'config'
import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Log from '../Log'

export default connect({
  showLog: state`app.currentBin.showLog`,
  lastSavedDatetime: state`app.currentBin.lastSavedDatetime`,
  sandboxLoaded: signal`sandbox.sandboxLoaded`,
  appClicked: signal`app.clicked`,
  binLogged: signal`sandbox.binLogged`,
  saveClicked: signal`app.saveClicked`
},
  class Sandbox extends Component {
    constructor (props) {
      super(props)
      this.onIframeMessage = this.onIframeMessage.bind(this)
    }
    componentDidMount () {
      window.onmessage = this.onIframeMessage
    }
    componentDidUpdate (prevProps) {
      if (this.iframe && prevProps.lastSavedDatetime !== this.props.lastSavedDatetime) {
        this.iframe.src = config.sandboxServiceUrl
      }
    }
    onIframeMessage (event) {
      if (event.data.type === 'loaded') {
        this.props.sandboxLoaded()
      }

      if (event.data.type === 'log') {
        this.props.binLogged({
          log: event.data.value
        })
      }

      if (event.data.type === 'click') {
        this.props.appClicked()
      }

      if (event.data.type === 'save') {
        this.props.saveClicked()
      }
    }
    render () {
      return (
        <div className={styles.wrapper}>
          {this.props.lastSavedDatetime ? (
            <iframe
              ref={(node) => {
                this.iframe = node
              }}
              src={config.sandboxServiceUrl}
            />
          ) : null}
          {this.props.showLog ? <Log /> : null}
        </div>
      )
    }
  }
)

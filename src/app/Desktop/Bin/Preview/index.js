import config from 'config'
import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Log from '../Log'

export default connect({
  isLoading: state`bin.isLoading`,
  showLog: state`bin.currentBin.showLog`,
  lastSavedDatetime: state`bin.currentBin.lastSavedDatetime`,
  sandboxLoaded: signal`bin.sandboxLoaded`,
  appClicked: signal`app.clicked`,
  binLogged: signal`bin.binLogged`
},
  class Preview extends Component {
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
    }
    render () {
      return (
        <div className={styles.wrapper}>
          {this.props.isLoading ? null : (
            <iframe
              ref={(node) => {
                this.iframe = node
              }}
              src={config.sandboxServiceUrl}
            />
          )}
          {this.props.showLog ? <Log /> : null}
        </div>
      )
    }
  }
)

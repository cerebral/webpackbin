import config from 'config'
import Inferno from 'inferno'
import Component from 'inferno-component'
import classnames from 'classnames'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Log from '../Log'
import Addressbar from './Addressbar'

export default connect({
  showLog: state`app.currentBin.showLog`,
  url: state`sandbox.url`,
  showIsLoadingSandbox: state`sandbox.showIsLoadingSandbox`,
  lastSavedDatetime: state`app.currentBin.lastSavedDatetime`,
  lastNavigation: state`sandbox.lastNavigation`,
  sandboxLoaded: signal`sandbox.sandboxLoaded`,
  appClicked: signal`app.clicked`,
  binLogged: signal`sandbox.binLogged`,
  saveClicked: signal`app.saveClicked`,
  urlUpdated: signal`sandbox.urlUpdated`
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
      if (this.iframe && prevProps.lastNavigation !== this.props.lastNavigation) {
        this.iframe.contentWindow.postMessage(this.props.lastNavigation, config.sandboxServiceUrl)
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

      if (event.data.type === 'url') {
        this.props.urlUpdated({
          url: event.data.value
        })
      }
    }
    render () {
      return (
        <div className={styles.wrapper}>
          {this.props.url ? <Addressbar /> : null}
          {this.props.lastSavedDatetime ? (
            <iframe
              ref={(node) => {
                this.iframe = node
              }}
              src={config.sandboxServiceUrl}
              style={{height: this.props.url ? 'calc(100% - 36px)' : '100%'}}
            />
          ) : null}
          {this.props.showLog ? <Log /> : null}
          <div
            className={classnames(styles.iframeLoader, {
              [styles.iframeLoaderVisible]: this.props.showIsLoadingSandbox
            })}
            style={{top: this.props.url ? '41px' : 0}}
          >
            Loading...
          </div>
        </div>
      )
    }
  }
)

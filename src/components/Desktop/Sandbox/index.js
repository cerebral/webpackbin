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
  isUpdatingSandbox: state`sandbox.isUpdatingSandbox`,
  region: state`settings.region`,
  showIsLoadingSandbox: state`sandbox.showIsLoadingSandbox`,
  hasSandboxTimeout: state`sandbox.hasSandboxTimeout`,
  showIsPackaging: state`sandbox.showIsPackaging`,
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
        this.iframe.src = config.sandboxServiceUrl[this.props.region]
      }
      if (this.iframe && prevProps.lastNavigation !== this.props.lastNavigation) {
        this.iframe.contentWindow.postMessage(this.props.lastNavigation, config.sandboxServiceUrl[this.props.region])
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
    renderLoaderText () {
      if (this.props.hasSandboxTimeout) {
        return 'Wow, this is taking a long time, did you put many packages together? Please hold on a bit more...'
      } else if (this.props.showIsPackaging) {
        return 'It seems that the packages of this bin is new or has expired, please hold on for a few extra seconds...'
      }

      return 'Loading...'
    }
    render () {
      return (
        <div className={styles.wrapper}>
          {this.props.url ? <Addressbar /> : null}
          {this.props.isUpdatingSandbox ? null : (
            <iframe
              ref={(node) => {
                this.iframe = node
              }}
              src={config.sandboxServiceUrl[this.props.region]}
              style={{height: this.props.url ? 'calc(100% - 36px)' : '100%'}}
            />
          )}
          {this.props.showLog ? <Log /> : null}
          <div
            className={classnames(styles.iframeLoader, {
              [styles.iframeLoaderVisible]: this.props.showIsLoadingSandbox || this.props.showIsPackaging,
              [styles.iframeLoaderPulse]: this.props.showIsLoadingSandbox && !this.props.showIsPackaging
            })}
            style={{top: this.props.url ? '41px' : '5px'}}
          >
            {this.renderLoaderText()}
          </div>
        </div>
      )
    }
  }
)

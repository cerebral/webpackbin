import Inferno from 'inferno'
import Component from 'inferno-component'
import styles from './styles.css'

class Preview extends Component {
  constructor (props) {
    super(props)
    this.onIframeMessage = this.onIframeMessage.bind(this)
  }
  componentDidUpdate (prevProps) {
    if (this.iframe && prevProps.lastSavedDatetime !== this.props.lastSavedDatetime) {
      this.iframe.src = this.props.src
      this.props.onLoading()
    }
  }
  onIframeMessage (event) {
    if (event.data.type === 'loaded') {
      this.props.onLoaded()
    }
    if (event.data.type === 'log') {
      this.props.onLog(event.data.value)
    }
    if (event.data.type === 'click') {
      this.props.onClick()
    }
  }
  render () {
    return (
      <div className={styles.wrapper}>
        {this.props.src ? (
          <iframe
            ref={(node) => {
              this.iframe = node
            }}
            src={this.props.src}
          />
        ) : null}
      </div>
    )
  }
}

export default Preview

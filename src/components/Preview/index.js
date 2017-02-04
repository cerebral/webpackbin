import Inferno from 'inferno'
import Component from 'inferno-component'
import styles from './styles.css'

class Preview extends Component {
  componentDidUpdate (prevProps) {
    if (prevProps.lastSavedDatetime !== this.props.lastSavedDatetime) {
      this.iframe.src = this.props.src
    }
  }
  render () {
    return (
      <div className={styles.wrapper}>
        <iframe
          ref={(node) => {
            this.iframe = node
          }}
          src={this.props.src}
        />
      </div>
    )
  }
}

export default Preview

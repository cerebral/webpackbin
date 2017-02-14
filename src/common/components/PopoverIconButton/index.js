import Inferno from 'inferno'
import Component from 'inferno-component'
import IconButton from '../IconButton'
import classNames from 'classnames'
import styles from './styles.css'

class PopoverIconButton extends Component {
  onArrowBoxClick (e) {
    e.stopPropagation()
  }
  renderPopup () {
    return (
      <div className={styles.popup}>
        <div
          className={classNames(styles.arrowBox, {
            [styles.arrowBoxRight]: this.props.right,
            [styles.arrowBoxMiddle]: this.props.middle
          })}
          onClick={(e) => this.onArrowBoxClick(e)}>
          <div className={styles.contentBox}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
  render () {
    return (
      <div className={classNames(styles.wrapper, {
        [this.props.className]: this.props.className
      })}>
        <IconButton
          disabled={this.props.disabled}
          active={this.props.show}
          icon={this.props.icon}
          onClick={this.props.onClick}
        >
          {this.props.label}
        </IconButton>
        {this.props.show ? this.renderPopup() : null}
      </div>
    )
  }
}

export default PopoverIconButton

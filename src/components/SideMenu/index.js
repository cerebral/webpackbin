import Inferno from 'inferno'
import Component from 'inferno-component'
import classNames from 'classnames'
import styles from './styles.css'

class SideMenu extends Component {
  onBoxClick (e) {
    e.stopPropagation()
  }
  render () {
    const side = this.props.side

    return (
      <div
        className={classNames(styles.wrapper, styles[side], {
          [styles.showLeft]: this.props.side === 'left' && this.props.show,
          [styles.showRight]: this.props.side === 'right' && this.props.show
        })}
        onClick={(e) => this.onBoxClick(e)}
      >
        {this.props.children}
      </div>
    )
  }
}

export default SideMenu

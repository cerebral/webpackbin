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
    const Page = (this.props.pages || []).reduce((pageMatch, page) => {
      if (pageMatch) {
        return pageMatch
      }

      if (page.name === this.props.page) {
        return page.content
      }

      return pageMatch
    }, null)

    return (
      <div
        className={classNames(styles.wrapper, styles[side], {
          [styles.showLeft]: this.props.side === 'left' && this.props.show,
          [styles.showRight]: this.props.side === 'right' && this.props.show
        })}
        style={{
          width: this.props.page ? '600px' : '300px'
        }}
        onClick={(e) => this.onBoxClick(e)}
      >
        <div className={styles.menu}>
          {this.props.children}
        </div>
        <div className={styles.page}>
          {Page ? <Page /> : null}
        </div>
      </div>
    )
  }
}

export default SideMenu

import React from 'react'

import classNames from 'classnames'
import styles from './styles.css'

class SideMenu extends React.Component {
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
        {
          side === 'left' ? (
            <div className={styles.page}>
              {Page ? <Page /> : null}
            </div>
          ) : null
        }
        <div className={styles[side + 'Menu']}>
          {this.props.children}
        </div>
        {
          side === 'right' ? (
            <div className={styles.page}>
              {Page ? <Page /> : null}
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default SideMenu

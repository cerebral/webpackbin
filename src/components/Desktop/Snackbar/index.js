import React from 'react'
import {connect} from '@cerebral/react'
import styles from './styles.css'
import classnames from 'classnames'
import {state, signal} from 'cerebral/tags'

export default connect({
  snackbar: state`app.snackbar`,
  undo: state`app.undo`,
  undoClicked: signal`app.undoClicked`
},
  function Snackbar (props) {
    const snackbar = props.snackbar || {text: '', type: 'noral'}

    return (
      <div className={classnames(styles.snackbar, {
        [styles.visible]: Boolean(snackbar.text),
        [styles.error]: snackbar.type === 'error'
      })}>
        <div className={styles.text}>{snackbar.text}</div>
        {props.undo ? (
          <span
            className={styles.undo}
            onClick={() => props.undoClicked()}
          >
            undo
          </span>
        ) : null}
      </div>
    )
  }
)

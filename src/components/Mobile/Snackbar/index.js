import React from 'react'
import {connect} from '@cerebral/react'
import styles from './styles.css'
import classnames from 'classnames'
import {state} from 'cerebral/tags'

export default connect({
  snackbar: state`app.snackbar`
},
  function Snackbar (props) {
    const snackbar = props.snackbar || {text: '', type: 'noral'}

    return (
      <div className={classnames(styles.snackbar, {
        [styles.visible]: Boolean(snackbar.text),
        [styles.error]: snackbar.type === 'error'
      })}>
        {snackbar.text}
      </div>
    )
  }
)

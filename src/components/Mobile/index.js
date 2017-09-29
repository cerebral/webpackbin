import React from 'react'
import {connect} from '@cerebral/react'
import styles from './styles.css'
import {state, signal} from 'cerebral/tags'
import Loader from 'common/components/Loader'
import Snackbar from './Snackbar'
import CodeEditor from './CodeEditor'
import MainNavigation from './MainNavigation'
import Sandbox from './Sandbox'

export default connect({
  user: state`app.user`,
  isLoading: state`app.isLoading`,
  clicked: signal`app.clicked`
},
  function Mobile ({
    user,
    isLoading,
    clicked
  }) {
    return (
      <div
        className={styles.wrapper}
        onClick={() => clicked()}
      >
        <MainNavigation />
        {
          user ? (
            <div className={styles.editorWrapper}>
              <CodeEditor />
              <Sandbox />
            </div>
          ) : null
        }
        {isLoading ? <Loader>Loading up the bin!</Loader> : null}
        <Snackbar />
      </div>
    )
  }
)

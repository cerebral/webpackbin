import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import Modal from 'common/components/Modal'
import Button from 'common/components/Button'
import styles from './styles.css'

export default connect({
  showGithubSignIn: state`app.showGithubSignIn`,
  isSigningIn: state`app.isSigningIn`,
  githubSignInAborted: signal`app.githubSignInAborted`,
  githubSignUpClicked: signal`app.githubSignUpClicked`,
  githubConvertClicked: signal`app.githubConvertClicked`
},
  function GithubSignIn ({
    showGithubSignIn,
    isSigningIn,
    githubSignInAborted,
    githubSignUpClicked,
    githubConvertClicked
  }) {
    if (!showGithubSignIn) {
      return null
    }

    return (
      <Modal
        onHide={() => githubSignInAborted()}
        width={620}
      >
        <h1>Sign in with GitHub</h1>
        <div className={styles.wrapper}>
          <div className={styles.box}>
            <h3>Sign me in</h3>
            <p className={styles.description}>
              You have a GitHub account and you want to sign into existing Webpackbin account or create a new one.
            </p>
            <Button
              disabled={isSigningIn}
              onClick={() => githubSignUpClicked()}
            >
              Sign in
            </Button>
          </div>
          <div className={styles.box}>
            <h3>Convert anonymous</h3>
            <p className={styles.description}>
              You are new on Webpackbin and would like to keep ownership on any existing bins and other interactions done so far.
            </p>
            <Button
              disabled={isSigningIn}
              onClick={() => githubConvertClicked()}
            >
              Convert
            </Button>
          </div>
        </div>
      </Modal>
    )
  }
)

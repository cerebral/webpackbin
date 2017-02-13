import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'components/IconButton'
import Input from 'components/Input'
import styles from './styles.css'

import liveStatus from 'computed/liveStatus'
import isInMyBins from 'computed/isInMyBins'

export default connect({
  liveStatus,
  isInMyBins,
  currentBinKey: state`bin.currentBinKey`,
  showMyBinsTitleInput: state`app.showMyBinsTitleInput`,
  myBinsTitle: state`app.myBinsTitle`,
  myBinsClicked: signal`app.myBinsClicked`,
  myBinsTitleChanged: signal`app.myBinsTitleChanged`,
  myBinsTitleSubmitted: signal`app.myBinsTitleSubmitted`,
  myBinsTitleAborted: signal`app.myBinsTitleAborted`
},
  class MyBins extends Component {
    componentDidUpdate (prevProps) {
      if (!prevProps.showNewFileInput && this.props.showNewFileInput) {
        this.focusInput()
      }
    }
    focusInput () {
      document.querySelector('#myBinsTitle').focus()
    }
    render () {
      const {
        liveStatus,
        isInMyBins,
        currentBinKey,
        showMyBinsTitleInput,
        myBinsTitle,
        myBinsClicked,
        myBinsTitleChanged,
        myBinsTitleSubmitted,
        myBinsTitleAborted
      } = this.props

      if (showMyBinsTitleInput) {
        return (
          <div className={styles.wrapper}>
            <Input
              id='newFileName'
              autoFocus
              value={myBinsTitle}
              onInput={(event) => myBinsTitleChanged({value: event.target.value})}
              onSubmit={myBinsTitleSubmitted}
              onCancel={myBinsTitleAborted}
              placeholder='Name the bin...'
            />
          </div>
        )
      }

      return (
        <div className={styles.wrapper}>
          <IconButton
            active={isInMyBins}
            disabled={liveStatus.isParticipant || !currentBinKey}
            onClick={() => myBinsClicked()}
            icon='myBins'
          >
            My bins
          </IconButton>
        </div>
      )
    }
  }
)

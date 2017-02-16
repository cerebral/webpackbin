import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'common/components/IconButton'
import Input from 'common/components/Input'
import styles from './styles.css'

import liveStatus from 'computed/liveStatus'
import isInMyBins from 'computed/isInMyBins'

export default connect({
  liveStatus,
  isInMyBins,
  currentBinKey: state`app.currentBinKey`,
  showNewTitleInput: state`myBins.showNewTitleInput`,
  newMyBinTitle: state`myBins.newMyBinTitle`,
  addMyBinsClicked: signal`myBins.addMyBinsClicked`,
  myBinsTitleChanged: signal`myBins.myBinsTitleChanged`,
  myBinsTitleSubmitted: signal`myBins.myBinsTitleSubmitted`,
  myBinsTitleAborted: signal`myBins.myBinsTitleAborted`
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
        showNewTitleInput,
        newMyBinTitle,
        addMyBinsClicked,
        myBinsTitleChanged,
        myBinsTitleSubmitted,
        myBinsTitleAborted
      } = this.props

      if (showNewTitleInput) {
        return (
          <div className={styles.wrapper}>
            <Input
              id='newFileName'
              autoFocus
              value={newMyBinTitle}
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
            onClick={() => addMyBinsClicked()}
            icon='myBins'
          >
            My bins
          </IconButton>
        </div>
      )
    }
  }
)

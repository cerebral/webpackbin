import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import IconButton from 'common/components/IconButton'
import Checkbox from 'common/components/Checkbox'
import Input from 'common/components/Input'
import styles from './styles.css'

import binHasEntry from 'computed/binHasEntry'
import liveStatus from 'computed/liveStatus'

export default connect({
  liveStatus,
  showNewFileInput: state`app.currentBin.showNewFileInput`,
  newFileName: state`app.currentBin.newFileName`,
  newFileIsEntry: state`app.currentBin.newFileIsEntry`,
  hasEntry: binHasEntry,
  newFileClicked: signal`files.newFileClicked`,
  newFileNameChanged: signal`files.newFileNameChanged`,
  newFileNameSubmitted: signal`files.newFileNameSubmitted`,
  isEntryToggled: signal`files.isEntryToggled`,
  newFileAborted: signal`files.newFileAborted`
},
  class AddFile extends Component {
    constructor (props) {
      super(props)
      this.onEntryToggle = this.onEntryToggle.bind(this)
    }
    componentDidUpdate (prevProps) {
      if (!prevProps.showNewFileInput && this.props.showNewFileInput) {
        this.focusInput()
      }
    }
    focusInput () {
      document.querySelector('#newFileName').focus()
    }
    onEntryToggle () {
      this.focusInput()
      this.props.isEntryToggled()
    }
    render () {
      const {
        showNewFileInput,
        newFileName,
        newFileIsEntry,
        hasEntry,
        newFileClicked,
        newFileNameChanged,
        newFileNameSubmitted,
        newFileAborted
      } = this.props

      if (showNewFileInput) {
        return (
          <div className={styles.wrapper}>
            <Input
              id='newFileName'
              autoFocus
              value={newFileName}
              onInput={(event) => newFileNameChanged({value: event.target.value})}
              onSubmit={newFileNameSubmitted}
              onCancel={newFileAborted}
              placeholder='Filename...'
            />
            <Checkbox
              checked={newFileIsEntry}
              disabled={hasEntry}
              onChange={this.onEntryToggle}
            >
              Is entry
            </Checkbox>
          </div>
        )
      }

      return (
        <div className={styles.wrapper}>
          <IconButton
            disabled={this.props.liveStatus.isParticipant}
            onClick={() => newFileClicked()}
            icon='addFile'
          >
            New file
          </IconButton>
        </div>
      )
    }
  }
)

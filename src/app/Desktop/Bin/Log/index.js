import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Inspector from 'components/Inspector'
import icons from 'common/icons.css'
import liveStatus from 'computed/liveStatus'

export default connect({
  liveStatus,
  logs: state`bin.logs`,
  selectedPath: state`bin.currentBin.selectedLogPath`,
  showFullLog: state`bin.currentBin.showFullLog`,
  logSizeToggled: signal`bin.logSizeToggled`,
  logValueToggled: signal`bin.logValueToggled`,
  logPathSelected: signal`bin.logPathSelected`
},
  class Log extends Component {
    render () {
      return (
        <div className={this.props.showFullLog ? styles.wrapper : styles.halfWrapper}>
          <div className={styles.info}>Use bin.log() in your code to log</div>
          {
            this.props.logs.map((value, index) => (
              <div className={styles.log} key={index}>
                <Inspector
                  value={value}
                  path={[index]}
                  highlight={this.props.liveStatus.isConnected}
                  onTogglePath={this.props.logValueToggled}
                  onSelectPath={this.props.logPathSelected}
                  selectedPath={this.props.selectedPath}
                />
              </div>
            ))
          }
          <div
            className={styles.size}
            onClick={() => this.props.logSizeToggled()}>
            <i className={this.props.showFullLog ? icons.halfLog : icons.fullLog} />
          </div>
        </div>
      )
    }
  }
)

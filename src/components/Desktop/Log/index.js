import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Inspector from 'common/components/Inspector'
import icons from 'common/icons.css'
import liveStatus from 'computed/liveStatus'

export default connect({
  liveStatus,
  logs: state`log.list`,
  selectedPath: state`app.currentBin.selectedLogPath`,
  showFullLog: state`app.currentBin.showFullLog`,
  logSizeToggled: signal`log.logSizeToggled`,
  logValueToggled: signal`log.logValueToggled`,
  logPathSelected: signal`log.logPathSelected`
},
  class Log extends Component {
    render () {
      return (
        <div className={this.props.showFullLog ? styles.wrapper : styles.halfWrapper}>
          <div className={styles.info}>Use console.log() in your code to log</div>
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

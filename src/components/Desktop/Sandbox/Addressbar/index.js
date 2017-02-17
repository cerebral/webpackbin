import config from 'config'
import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import icons from 'common/icons.css'
import Input from 'common/components/Input'

export default connect({
  hash: state`sandbox.hash`,
  hashChanged: signal`sandbox.hashChanged`,
  hashSubmitted: signal`sandbox.hashSubmitted`,
  historyChanged: signal`sandbox.historyChanged`
},
  function Addressbar (props) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.buttonsWrapper}>
          <div
            onClick={() => props.historyChanged({type: 'back'})}
            className={styles.button}
          >
            <i className={icons.chevronLeft} />
          </div>
          <div
            onClick={() => props.historyChanged({type: 'forward'})}
            className={styles.button}
          >
            <i className={icons.chevronRight} />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <div>{`${config.sandboxServiceUrl}/${props.hash ? '#' : ''}`}</div>
          {
            props.hash ? (
              <Input
                value={props.hash.substr(1)}
                onInput={(event) => props.hashChanged({value: '#' + event.target.value})}
                onSubmit={props.hashSubmitted}
              />
            ) : null
          }
        </div>
      </div>
    )
  }
)

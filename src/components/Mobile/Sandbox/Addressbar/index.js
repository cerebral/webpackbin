import config from 'config'
import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import icons from 'common/icons.css'
import Input from 'common/components/Input'

export default connect({
  url: state`sandbox.url`,
  region: state`settings.region`,
  urlChanged: signal`sandbox.urlChanged`,
  urlSubmitted: signal`sandbox.urlSubmitted`,
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
          <div>{config.sandboxServiceUrl[props.region]}</div>
          {
            props.url ? (
              <Input
                value={props.url}
                onInput={(event) => props.urlChanged({value: event.target.value})}
                onSubmit={props.urlSubmitted}
              />
            ) : null
          }
        </div>
      </div>
    )
  }
)

import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'

export default connect({
  quickstarts: state`bin.configure.quickstarts`,
  quickstartClicked: signal`bin.configure.quickstartClicked`
},
  function Quickstart ({
    quickstarts,
    quickstartClicked
  }) {
    return (
      <ul className={styles.list}>
        {quickstarts.map(function (quickstart) {
          return (
            <li
              className={styles.listItem}
              onClick={() => quickstartClicked({template: quickstart.template})}
            >
              {quickstart.title}
              <small>{quickstart.description}</small>
            </li>
          )
        })}
      </ul>
    )
  }
)

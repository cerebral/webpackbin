import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Description from 'common/components/Description'

export default connect({
  quickstarts: state`configure.quickstarts`,
  quickstartClicked: signal`configure.quickstartClicked`
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
              <Description>{quickstart.description}</Description>
            </li>
          )
        })}
      </ul>
    )
  }
)

import Inferno from 'inferno'
import Component from 'inferno-component'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Input from 'components/Input'
import Checkbox from 'components/Checkbox'
import Description from 'components/Description'

export default connect({
  query: state`bin.configure.packageQuery`,
  packages: state`bin.currentBin.packages`,
  isQueryingPackage: state`bin.configure.isQueryingPackage`,
  packageQueryChanged: signal`bin.configure.packageQueryChanged`,
  packageQuerySubmitted: signal`bin.configure.packageQuerySubmitted`,
  packageToggled: signal`bin.configure.packageToggled`
},
  class Packages extends Component {
    componentDidUpdate (prevProps) {
      if (prevProps.isQueryingPackage && !this.props.isQueryingPackage) {
        document.querySelector('#packageQuery').focus()
      }
    }
    render () {
      const {
        query,
        packages,
        isQueryingPackage,
        packageQueryChanged,
        packageQuerySubmitted,
        packageToggled
      } = this.props

      return (
        <div>
          <Input
            id='packageQuery'
            autoFocus
            dark
            disabled={isQueryingPackage}
            placeholder='Submit name of package...'
            value={query}
            onInput={(event) => packageQueryChanged({query: event.target.value})}
            onSubmit={packageQuerySubmitted}
          />
          <Description>
            You can assign specific version with "@", ex. "react@0.14.7"
          </Description>
          <ul className={styles.list}>
            {Object.keys(packages).map(function (packageName) {
              return (
                <li className={styles.listItem}>
                  <Checkbox
                    checked
                    onChange={() => {
                      document.querySelector('#packageQuery').focus()
                      packageToggled({packageName})
                    }}
                  >
                    {packageName}@{packages[packageName]}
                  </Checkbox>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }
)

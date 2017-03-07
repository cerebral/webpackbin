import Inferno from 'inferno'
import Component from 'inferno-component'
import {decodeKey} from 'utils'
import {connect} from 'cerebral/inferno'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'
import Input from 'common/components/Input'
import Checkbox from 'common/components/Checkbox'
import Description from 'common/components/Description'

export default connect({
  query: state`app.currentBin.packageQuery`,
  packages: state`app.currentBin.packages`,
  isQueryingPackage: state`configure.isQueryingPackage`,
  packageQueryChanged: signal`configure.packageQueryChanged`,
  packageQuerySubmitted: signal`configure.packageQuerySubmitted`,
  packageToggled: signal`configure.packageToggled`
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
            disabled={isQueryingPackage || Object.keys(packages).length >= 5}
            placeholder='Submit name of package...'
            value={query}
            onInput={(event) => packageQueryChanged({query: event.target.value})}
            onSubmit={packageQuerySubmitted}
          />
          <Description>
            You can assign specific version with "@", ex. "react@0.14.7" or "react@next"
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
                    {decodeKey(packageName)}
                    <Description>{packages[packageName]}</Description>
                  </Checkbox>
                </li>
              )
            })}
          </ul>
          {
            Object.keys(packages).length >= 5 ? (
              <Description>
                You have added the maximum number of packages allowed
              </Description>
            ) : null
          }
        </div>
      )
    }
  }
)

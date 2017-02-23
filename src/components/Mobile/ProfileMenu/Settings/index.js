import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import MenuItem from 'common/components/MenuItem'
import Checkbox from 'common/components/Checkbox'
import Description from 'common/components/Description'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'

export default connect({
  lint: state`settings.lint`,
  region: state`settings.region`,
  lintToggled: signal`settings.lintToggled`,
  regionToggled: signal`settings.regionToggled`
},
  function Settings ({
    lint,
    region,
    page,
    lintToggled,
    regionToggled
  }) {
    return (
      <div>
        <div className={styles.separator}>
          Code
        </div>
        <MenuItem
          onClick={() => lintToggled()}
        >
          <div>
            <Checkbox
              onChange={() => lintToggled()}
              checked={lint}
            >
              Linter
            </Checkbox>
            <Description light>
              Load and run supported linters
            </Description>
          </div>
        </MenuItem>
        <div className={styles.separator}>
          Sandbox region
        </div>
        <MenuItem
          onClick={() => regionToggled({region: 'US'})}
        >
          <div>
            <Checkbox
              onChange={() => regionToggled({region: 'US'})}
              checked={region === 'US'}
            >
              US
            </Checkbox>
            <Description light>
              If you live in the Americas
            </Description>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => regionToggled({region: 'EU'})}
        >
          <div>
            <Checkbox
              onChange={() => regionToggled({region: 'EU'})}
              checked={region === 'EU'}
            >
              Europe
            </Checkbox>
            <Description light>
              If you live anywhere else
            </Description>
          </div>
        </MenuItem>
      </div>
    )
  }
)

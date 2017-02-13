import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import MenuItem from 'components/MenuItem'
import Checkbox from 'components/Checkbox'
import Description from 'components/Description'
import {state, signal} from 'cerebral/tags'

export default connect({
  lint: state`settings.lint`,
  lintToggled: signal`settings.lintToggled`
},
  function Settings ({
    lint,
    page,
    lintToggled
  }) {
    return (
      <div>
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
      </div>
    )
  }
)

import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import MenuItem from 'components/MenuItem'
import Description from 'components/Description'
import {state, signal} from 'cerebral/tags'

export default connect({
  bins: state`app.myBins`,
  myBinClicked: signal`app.myBinClicked`
},
  function Settings ({
    bins,
    myBinClicked
  }) {
    return (
      <div>
        {Object.keys(bins).map((binKey) => {
          return (
            <MenuItem
              icon='newBin'
              onClick={() => myBinClicked({binKey: bins[binKey].binKey})}
            >
              <div>
                {bins[binKey].name}
                <Description light>
                  {new Date(bins[binKey].datetime).toLocaleDateString()}
                </Description>
              </div>
            </MenuItem>
          )
        })}
      </div>
    )
  }
)

import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import MenuItem from 'common/components/MenuItem'
import Description from 'common/components/Description'
import {state, signal} from 'cerebral/tags'

export default connect({
  bins: state`myBins.list`,
  myBinClicked: signal`myBins.myBinClicked`
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

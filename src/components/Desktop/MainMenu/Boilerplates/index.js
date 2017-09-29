import React from 'react'
import {connect} from '@cerebral/react'
import MenuItem from 'common/components/MenuItem'
import Description from 'common/components/Description'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'

export default connect({
  isLoading: state`boilerplates.isLoadingBoilerplates`,
  boilerplates: state`boilerplates.list`,
  boilerplateClicked: signal`boilerplates.boilerplateClicked`
},
  function Settings ({
    isLoading,
    boilerplates,
    boilerplateClicked
  }) {
    if (isLoading) {
      return <div className={styles.loader}>Loading...</div>
    }

    return (
      <div>
        {Object.keys(boilerplates).map((binKey) => {
          return (
            <MenuItem
              icon='newBin'
              onClick={() => boilerplateClicked({binKey: boilerplates[binKey].binKey})}
            >
              <div>
                {boilerplates[binKey].name}
                <Description light>
                  {new Date(boilerplates[binKey].datetime).toLocaleDateString()}
                </Description>
              </div>
            </MenuItem>
          )
        })}
      </div>
    )
  }
)

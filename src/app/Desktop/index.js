import Inferno from 'inferno'
import {connect} from 'cerebral/inferno'
import NavigationBar from 'components/NavigationBar'
import IconButton from 'components/IconButton'
import IconTextButton from 'components/IconTextButton'
import Bin from './Bin'
import styles from './styles.css'
import PopoverIconButton from 'components/PopoverIconButton'
import Input from 'components/Input'

export default connect({
  
},
  function Desktop () {
    return (
      <div className={styles.wrapper}>
        <NavigationBar>
          <IconButton icon='addAssignment' />
          <IconButton icon='stop' />
          <IconButton icon='addFile' />
          <Input />
          <PopoverIconButton
            icon='addFile'
            title='Heisann?'
            show
            >
            Heisann hoppsann! Her går det unna Gunnar :)
          </PopoverIconButton>
          <IconTextButton
            icon='addFile'
            text='Heisann'
            />
        </NavigationBar>
        <Bin />
      </div>
    )
  }
)

import Inferno from 'inferno'
import {Controller} from 'cerebral'
import {Container} from 'cerebral/inferno'
import DeviceLoader from 'components/DeviceLoader'
import UseragentModule from 'cerebral-module-useragent'

const controller = Controller({
  modules: {
    useragent: UseragentModule()
  }
})

Inferno.render((
  <Container controller={controller}>
    <DeviceLoader />
  </Container>
), document.querySelector('#app'))

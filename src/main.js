import config from 'config'
import Inferno from 'inferno'
import {Controller} from 'cerebral'
import {Container} from 'cerebral/inferno'
import Devtools from 'cerebral/devtools'
import DeviceLoader from './app/DeviceLoader'
import UseragentModule from 'cerebral-module-useragent'
import FirebaseProvider from 'cerebral-provider-firebase'
import app from './modules/app'

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools(),
  modules: {
    app,
    useragent: UseragentModule()
  },
  providers: [
    FirebaseProvider({
      config: config.firebaseConfig
    })
  ]
})

Inferno.render((
  <Container controller={controller}>
    <DeviceLoader />
  </Container>
), document.querySelector('#app'))

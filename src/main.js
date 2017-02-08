import config from 'config'
import Inferno from 'inferno'
import {Controller} from 'cerebral'
import {Container} from 'cerebral/inferno'
import Devtools from 'cerebral/devtools'
import Router from 'cerebral-router'
import DeviceLoader from './app/DeviceLoader'
import UseragentModule from 'cerebral-module-useragent'
import FirebaseProvider from 'cerebral-provider-firebase'
import HttpProvider from 'cerebral-provider-http'
import app from './modules/app'
import bin from './modules/bin'
import shortcuts from './modules/shortcuts'

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools(),
  router: Router({
    routes: {
      '/': 'app.routed',
      '/bins/:binKey': 'app.binRouted'
    },
    onlyHash: true
  }),
  modules: {
    app,
    bin,
    shortcuts: shortcuts({
      'cmd+s': 'bin.saveClicked',
      'ctrl+s': 'bin.saveClicked'
    }),
    useragent: UseragentModule()
  },
  providers: [
    FirebaseProvider({
      config: config.firebaseConfig
    }),
    HttpProvider()
  ]
})

Inferno.render((
  <Container controller={controller}>
    <DeviceLoader />
  </Container>
), document.querySelector('#app'))

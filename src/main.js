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
      '/': 'bin.routed'
    },
    onlyHash: true
  }),
  modules: {
    app,
    bin,
    shortcuts: shortcuts({
      'cmd+s': 'bin.saveShortcutPressed',
      'ctrl+s': 'bin.saveShortcutPressed'
    }),
    useragent: UseragentModule()
  },
  providers: [
    FirebaseProvider({
      config: config.firebaseConfig
    }),
    HttpProvider({
      withCredentials: true
    })
  ]
})

Inferno.render((
  <Container controller={controller}>
    <DeviceLoader />
  </Container>
), document.querySelector('#app'))

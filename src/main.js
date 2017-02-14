import config from 'config'
import Inferno from 'inferno'
import {Controller} from 'cerebral'
import {Container} from 'cerebral/inferno'
import Devtools from 'cerebral/devtools'
import Router from 'cerebral-router'
import DeviceLoader from './components/DeviceLoader'
import UseragentModule from 'cerebral-module-useragent'
import FirebaseProvider from 'cerebral-provider-firebase'
import HttpProvider from 'cerebral-provider-http'
import app from './modules/app'
import code from './modules/code'
import sandbox from './modules/sandbox'
import settings from './modules/settings'
import log from './modules/log'
import files from './modules/files'
import configure from './modules/configure'
import live from './modules/live'
import myBins from './modules/myBins'
import shortcuts from './modules/shortcuts'

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools({
    remoteDebugger: 'localhost:8787'
  }),
  router: Router({
    routes: {
      '/': 'app.routed',
      '/bins/:binKey': 'app.binRouted'
    },
    onlyHash: true
  }),
  modules: {
    app,
    code,
    log,
    files,
    live,
    configure,
    myBins,
    sandbox,
    settings,
    shortcuts: shortcuts({
      'cmd+s': 'app.saveClicked',
      'ctrl+s': 'app.saveClicked'
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

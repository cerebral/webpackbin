import config from 'config'
import Inferno from 'inferno'
import {Controller} from 'cerebral'
import {Container} from 'cerebral/inferno'
import Devtools from 'cerebral/devtools'
import Router from 'cerebral-router'
import AppLoader from './components/AppLoader'
import UseragentModule from 'cerebral-module-useragent'
import FirebaseProvider from 'cerebral-provider-firebase'
import HttpProvider from 'cerebral-provider-http'
import app from './modules/app'
import code from './modules/code'
import sandbox from './modules/sandbox'
import settings from './modules/settings'
import log from './modules/log'
import files from './modules/files'
import boilerplates from './modules/boilerplates'
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
      '/bins/:binKey': 'app.binRouted',
      '/*': 'app.invalidRouted'
    }
  }),
  modules: {
    app,
    code,
    log,
    files,
    boilerplates,
    live,
    configure,
    myBins,
    sandbox,
    settings,
    shortcuts: shortcuts({
      'cmd+s': 'app.saveClicked',
      'ctrl+s': 'app.saveClicked'
    }),
    useragent: UseragentModule({
      media: {
        unsupported: '(max-width: 550px)',
        mobile: '(max-width: 1000px)',
        desktop: '(min-width: 1001px)'
      }
    })
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
    <AppLoader />
  </Container>
), document.querySelector('#app'))

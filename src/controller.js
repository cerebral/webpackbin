import config from 'config'
import {Controller} from 'cerebral'
import Devtools from 'cerebral/devtools'
import Router from '@cerebral/router'
import UseragentModule from '@cerebral/useragent'
import FirebaseProvider from '@cerebral/firebase'
import HttpProvider from '@cerebral/http'

import app from './modules/app'
import code from './modules/code'
import sandbox from './modules/sandbox'
import settings from './modules/settings'
import log from './modules/log'
import files from './modules/files'
import boilerplates from './modules/boilerplates'
import configure from './modules/configure'
import live from './modules/live'
import favorites from './modules/favorites'
import shortcuts from './modules/shortcuts'

export default Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools({
    host: 'localhost:8484'
  }),
  modules: {
    router: Router({
      routes: [{
        path: '/',
        signal: 'app.routed'
      }, {
        path: '/bins/:binKey',
        signal: 'app.binRouted'
      }, {
        path: '/*',
        signal: 'app.invalidRouted'
      }]
    }),
    app,
    code,
    log,
    files,
    boilerplates,
    live,
    configure,
    favorites,
    sandbox,
    settings,
    shortcuts: shortcuts({
      'cmd+s': 'app.saveClicked',
      'ctrl+s': 'app.saveClicked'
    }),
    useragent: UseragentModule({
      media: {
        unsupported: '(max-width: 550px)',
        mobile: '(max-width: 700px)',
        desktop: '(min-width: 701px)'
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

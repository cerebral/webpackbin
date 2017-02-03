import 'dc/src/icons.css';

import moment from 'moment';
import language from 'language';
import {rules} from 'cerebral-forms';

moment.locale(language.moment.locale);
moment.updateLocale(language.moment.locale, language.moment.options);
rules.isMoreThan = (value, form, moreThan) => {
  return Number(value) > moreThan;
};
rules.isNotEmailTypo = (value) => {
  if (value.indexOf('gmail') >= 0) {
    return value.indexOf('gmail.com') >= 0;
  }

  return true;
};
rules.isPositiveInt = (value) => {
  return rules.isInt(value) && value >= 0;
};

import React from 'react';
import config from 'config';
import {render} from 'react-dom';
import {Controller} from 'cerebral';
import Devtools from 'cerebral/devtools';
import HttpProvider from 'cerebral-provider-http';
import FirebaseProvider from 'cerebral-provider-firebase';
import CalculatorProvider from './providers/CalculatorProvider';
import Router from 'cerebral-router';
import {Container} from 'cerebral/react';
import UseragentModule from 'cerebral-module-useragent';
import LocalStorageProvider from './providers/LocalStorageProvider';
import FacebookPixelProvider from './providers/FacebookPixelProvider';
import App from './components/App';

import AppModule from './modules/App';
import HeaderModule from './modules/Header';
import WelcomeModule from './modules/Welcome';
import ChallengesModule from './modules/Challenges';
import ProfileModule from './modules/Profile';
import AuthenticationModule from './modules/Authentication';
import DuckyAvatarModule from './modules/DuckyAvatar';
import CreateProfileModule from './modules/CreateProfile';
import TranslateModule from './modules/Translate';
import SettingsModule from './modules/Settings';
import SnackbarModule from './modules/Snackbar';
import ChallengeModule from './modules/Challenge';

const controller = Controller({
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools({
    storeMutations: false,
    bigComponentsWarning: {state: 50000000, signals: 50000000},
    remoteDebugger: 'localhost:8787'
  }),
  router: Router({
    routes: {
      '/': 'app.rootRouted',
      '/welcome': 'app.welcomeRouted',
      '/challenges': 'app.challengesRouted',
      '/challenges/:challengeKey': 'app.challengeRouted',
      '/profile': 'app.ownProfileRouted',
      '/profile/settings': 'app.settingsRouted',
      '/profiles/:profileKey': 'app.profileRouted',
      '/*': 'app.notFoundRouted'
    },
    onlyHash: true,
    query: true
  }),
  state: {
    error: null
  },
  modules: {
    app: AppModule,
    header: HeaderModule,
    welcome: WelcomeModule,
    challenge: ChallengeModule,
    challenges: ChallengesModule,
    authentication: AuthenticationModule(),
    duckyAvatar: DuckyAvatarModule,
    createProfile: CreateProfileModule,
    profile: ProfileModule,
    settings: SettingsModule,
    snackbar: SnackbarModule,
    translate: TranslateModule,
    useragent: UseragentModule({
      media: {
        small: '(max-width: 1024px)',
        medium: '(max-width: 1275px)',
        large: '(min-width: 1276px)'
      }
    })
  },
  providers: [
    LocalStorageProvider,
    CalculatorProvider,
    HttpProvider({
      baseURL: '/api'
    }),
    FirebaseProvider({
      specPrefix: process.env.TASK_PREFIX,
      config: {
        apiKey: config.firebase.apiKey,
        authDomain: config.firebase.authDomain,
        databaseURL: config.firebase.databaseURL,
        storageBucket: config.firebase.storageBucket
      }
    }),
    FacebookPixelProvider()
  ]
});

render((
  <Container controller={controller}>
    <App />
  </Container>
), document.querySelector('#app'));

import authenticate from './factories/authenticate';

import appClicked from './signals/appClicked';
import challengeRouted from 'modules/Challenge/chains/routed';
import challengesRouted from 'modules/Challenges/chains/routed';
import feedbackClicked from './signals/feedbackClicked';
import feedbackSent from './signals/feedbackSent';
import internetExplorerAdvanced from './signals/internetExplorerAdvanced.js';
import internetExplorerCancelled from './signals/internetExplorerCancelled.js';
import feedbackChanged from './signals/feedbackChanged';
import profileRouted from 'modules/Profile/chains/routed.js';
import settingsRouted from 'modules/Settings/chains/routed.js';
import onboardingModalClicked from './signals/onboardingModalClicked';
import cO2ActivitiesInfoModalClicked from './signals/cO2ActivitiesInfoModalClicked';
import userLoggedIn from './signals/userLoggedIn.js';
import welcomeRouted from 'modules/Welcome/chains/routed';
import reportErrorClicked from './signals/reportErrorClicked';
import fieldChanged from './signals/fieldChanged';
import registerModalCancelled from './signals/registerModalCancelled';
import moreOptionsClicked from './signals/moreOptionsClicked';
import showActivityModalClicked from './signals/showActivityModalClicked';
import scrolled from './signals/scrolled';
import changePage from './factories/changePage';
import rootRouted from './chains/rootRouted';
import requiresProfile from 'modules/Authentication/factories/requiresProfile';
import ownProfileRouted from 'modules/Profile/chains/ownRouted';
import newVersionUpdateClicked from './signals/newVersionUpdateClicked';
import lastDeployUpdated from './signals/lastDeployUpdated';

export default {
  state: {
    currentPage: null,
    isLoadingPage: false,
    user: null,
    profiles: {},
    organizations: {},
    activities: null,
    isAuthenticating: false,
    showInternetExplorerModal: false,
    showFeedbackModal: false,
    showRegisterModal: false,
    feedbackText: '',
    isSendingFeedback: false,
    showCreateProfileModal: false,
    showOnboardingModal: false,
    showCO2ActivitiesInfoModal: false,
    showErrorModal: false,
    activityModalKey: null,
    moreOptionsActivityKey: null,
    isInitialRoute: true,
    showNewVersionModal: false,
    isListeningToNewVersionUpdates: false,
    scrollAmount: {
      welcome: 0,
      challenges: 0,
      challenge: 0,
      profile: 0
    }
  },
  signals: {
    userLoggedIn,
    appClicked,
    notFoundRouted: changePage('notFound', []),
    welcomeRouted: changePage('welcome', welcomeRouted),
    challengeRouted: changePage('challenge', authenticate(challengeRouted)),
    challengesRouted: changePage('challenges', authenticate(challengesRouted)),
    rootRouted: authenticate(rootRouted),
    profileRouted: changePage('profile', authenticate(profileRouted)),
    settingsRouted: changePage('profile', authenticate([...profileRouted, ...settingsRouted])),
    ownProfileRouted: requiresProfile(changePage('profile', authenticate([...profileRouted, ...ownProfileRouted]))),
    internetExplorerCancelled,
    internetExplorerAdvanced,
    feedbackClicked,
    feedbackChanged,
    feedbackSent,
    onboardingModalClicked,
    cO2ActivitiesInfoModalClicked,
    reportErrorClicked,
    fieldChanged,
    registerModalCancelled,
    moreOptionsClicked,
    showActivityModalClicked,
    scrolled,
    newVersionUpdateClicked,
    lastDeployUpdated
  }
};

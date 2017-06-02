import quickstartClicked from './signals/quickstartClicked'
import packageQueryChanged from './signals/packageQueryChanged'
import packageQuerySubmitted from './signals/packageQuerySubmitted'
import packageToggled from './signals/packageToggled'
import loaderSelected from './signals/loaderSelected'
import loaderToggled from './signals/loaderToggled'
import loaderConfigChanged from './signals/loaderConfigChanged'
import configurationClicked from './signals/configurationClicked'
import forceNoLintToggled from './signals/forceNoLintToggled'
import preventWhenLiveParticipant from 'modules/app/factories/preventWhenLiveParticipant'
import hideQuickstartClicked from './signals/hideQuickstartClicked';

export default {
  state: {
    showQuickstart: false,
    quickstarts: [{
      title: 'ES2015',
      description: 'Creates an entrypoint with ES2016 transpiling, ready for you to add any NPM packages',
      template: 'es2015'
    }, {
      title: 'Typescript',
      description: 'Creates an entrypoint with Typescript transpiling, ready for you to add any NPM packages',
      template: 'typescript'
    }]
  },
  signals: {
    configurationClicked: preventWhenLiveParticipant(configurationClicked),
    quickstartClicked: preventWhenLiveParticipant(quickstartClicked),
    packageQueryChanged: preventWhenLiveParticipant(packageQueryChanged),
    packageQuerySubmitted: preventWhenLiveParticipant(packageQuerySubmitted),
    packageToggled: preventWhenLiveParticipant(packageToggled),
    loaderSelected: preventWhenLiveParticipant(loaderSelected),
    loaderToggled: preventWhenLiveParticipant(loaderToggled),
    loaderConfigChanged: preventWhenLiveParticipant(loaderConfigChanged),
    forceNoLintToggled: preventWhenLiveParticipant(forceNoLintToggled),
    hideQuickstartClicked
  }
}

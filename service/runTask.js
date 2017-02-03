const firebase = require('firebase-admin');
const config = require(`../configs/service-${process.env.DUCKY_ENV}.json`);
const FunctionTree = require('function-tree').default;
const Devtools = require('function-tree/lib/devtools').default;
const FirebaseProvider = require('./providers/Firebase');
const DashboardProvider = require('./providers/Dashboard');
const EmailProvider = require('./providers/Email');
const CalculatorProvider = require('./providers/Calculator');
const TranslateProvider = require('./providers/Translate');
const LogProvider = require('./providers/Log');

let providers = [];
let devtools = null;

if (process.env.NODE_ENV !== 'production') {
  devtools = Devtools({
    remoteDebugger: 'localhost:8989'
  });

  providers = providers.concat(devtools.Provider({
    firebase: 'red',
    dashboard: 'purple'
  }));
}

const runTask = new FunctionTree(providers.concat([
  DashboardProvider(),
  FirebaseProvider(firebase),
  TranslateProvider(),
  CalculatorProvider(),
  LogProvider(),
  EmailProvider({
    mandrillKey: config.mandrillApiKey,
    mailchimpKey: config.mailchimp.apiKey
  })
]));

if (devtools) {
  devtools.watchExecution(runTask);
}

module.exports = runTask;

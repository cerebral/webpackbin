import config from 'config';

function abortSandboxUpdate({ http, state }) {
  const region = state.get('settings.region');

  http.abort(config.sandboxServiceUrl[region]);
}

export default abortSandboxUpdate;

import config from 'config'

function updateSandbox ({http, state, path, resolve}) {
  const currentBin = state.get('app.currentBin')

  return http.post(config.sandboxServiceUrl, {
    files: currentBin.files,
    packages: currentBin.packages,
    loaders: currentBin.loaders
  }, {
    withCredentials: true
  })
    .then(path.success)
    .catch(path.error)
}

export default updateSandbox

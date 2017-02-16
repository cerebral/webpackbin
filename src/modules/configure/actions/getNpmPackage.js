import config from 'config'

function getNpmPackage ({props, state, http, path}) {
  const query = state.get('app.currentBin.packageQuery')

  return http.get(`${config.npmPackageQueryUrl}/${query}`)
    .then(path.success)
    .catch(path.error)
}

export default getNpmPackage

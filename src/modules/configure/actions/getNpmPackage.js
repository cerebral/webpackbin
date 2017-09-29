import config from 'config'

function getNpmPackage ({props, state, http, path}) {
  const query = state.get('app.currentBin.packageQuery')

  return http.get(`${config.npmPackageQueryUrl}/${encodeURIComponent(query)}`)
    .then(response => path.success({response}))
    .catch(error => path.error({error}))
}

export default getNpmPackage

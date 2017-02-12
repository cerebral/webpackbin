import config from 'config'

function getNpmPackage ({props, state, http, path}) {
  const query = state.get('bin.configure.packageQuery')

  return http.get(`${config.npmPackageQueryUrl}/${query}`)
    .then(path.success)
    .catch(path.error)
}

export default getNpmPackage

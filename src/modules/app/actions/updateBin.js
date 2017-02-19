import {encodePackages} from 'utils'

function updateBin ({state, firebase, path}) {
  const key = state.get('app.currentBinKey')
  const currentBin = state.get('app.currentBin')

  return firebase.set(`bins.${key}`, Object.assign({}, currentBin, {
    packages: encodePackages(currentBin.packages)
  }))
    .then(path.success)
    .catch(path.error)
}

export default updateBin

import getNpmPackage from '../actions/getNpmPackage'
import {set} from 'cerebral/operators'
import {state, input} from 'cerebral/tags'
import showSnackbar from 'modules/app/factories/showSnackbar'

export default [
  set(state`bin.configure.isQueryingPackage`, true),
  getNpmPackage, {
    success: [
      set(state`bin.currentBin.packages.${input`result.name`}`, input`result.version`),
      set(state`bin.configure.packageQuery`, '')
    ],
    error: [
      ...showSnackbar('Could not grab package, is it valid?', 5000, 'error')
    ]
  },
  set(state`bin.configure.isQueryingPackage`, false)
]

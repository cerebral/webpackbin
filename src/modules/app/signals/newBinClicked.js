import {goTo} from '@cerebral/router/operators'
import appClicked from './clicked'

export default [
  appClicked,
  goTo('/')
]

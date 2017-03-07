import {goTo} from 'cerebral-router'
import appClicked from './clicked'

export default [
  appClicked,
  goTo('/')
]

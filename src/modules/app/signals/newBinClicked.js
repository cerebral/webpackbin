import {redirect} from 'cerebral-router'
import appClicked from './clicked'

export default [
  ...appClicked,
  redirect('/')
]

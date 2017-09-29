import React from 'react'
import {render} from 'react-dom'
import {Container} from '@cerebral/react'
import controller from './controller'
import AppLoader from './components/AppLoader'

render((
  <Container controller={controller}>
    <AppLoader />
  </Container>
), document.querySelector('#app'))

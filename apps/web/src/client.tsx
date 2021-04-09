import React, { StrictMode } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { App } from './pages/App'

hydrate(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}

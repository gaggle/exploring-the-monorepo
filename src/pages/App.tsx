import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import { Home } from './Home'

export function App () {
  return <Switch>
    <Route exact={true} path="/" component={Home}/>
  </Switch>
}

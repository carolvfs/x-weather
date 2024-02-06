import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../views/home/Home'
import Stat from '../views/statistics/Statistics'
import Prob from '../views/prob/Prob'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/stat' component={Stat} />
        <Route path='/prob' component={Prob} />
        <Redirect from='*' to='/' />

    </Switch>
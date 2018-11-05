import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home'
import Character from './Components/Character/Character';

export default (
    <Switch>
        <Route component={Home} exact path="/" />
        {/* <Route component={Auth} exact path= "/auth" /> */}
        <Route component={Character} exact path="/character/:id" />
    </Switch>
)
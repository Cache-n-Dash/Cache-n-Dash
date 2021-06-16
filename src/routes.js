import { Switch, Route } from "react-router-dom";
import Home from './components/Home'
import Auth from './components/Auth'
import UserDash from './components/UserDash'
import LeaderBoard from './components/Leaderboard'
import Map from './components/Map'
import React from "react";
import Search from './components/Search'
import Admin from './components/Admin'

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/userdash" component={UserDash} />
    <Route exact path="/auth" component={Auth} />
    <Route exact path="/map" component={Map} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/leaderboard" component={LeaderBoard} />
  </Switch>
);

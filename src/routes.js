import { Switch, Route } from "react-router-dom";
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import UserDash from './components/UserDash/UserDash'
import LeaderBoard from './components/Leaderboard/LeaderBoard'
import Map from './components/Map/Map'
import React from "react";
import Search from './components/Search/Search'
import Admin from './components/Admin/Admin'

export default (
  <Switch>
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/auth" component={Auth} />
    <Route exact path="/" component={Home} />
    <Route exact path="/leaderboard" component={LeaderBoard} />
    <Route exact path="/map" component={Map} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/userdash" component={UserDash} />
  </Switch>
);

import { Switch, Route } from "react-router-dom";
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import UserDash from './components/UserDash/UserDash'
import LeaderBoard from './components/LeaderBoard/LeaderBoard'
import Map from './components/Map/Map'
// import Search from './components/Search/Search'
import Admin from './components/Admin/Admin'
import Contact from './components/Contact/Contact'
import React from "react";

export default (
  <Switch>
    <Route exact path="/admin" component={Admin} />
    <Route path="/auth" component={Auth} />
    <Route exact path="/" component={Home} />
    <Route path="/leaderboard" component={LeaderBoard} />
    <Route path="/map" component={Map} />
    {/* <Route path="/search" component={Search} /> */}
    <Route path="/profile" component={UserDash} />
    <Route path='/contact' component={Contact} />
  </Switch>
);

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Play from './play';
import Homepage from './homepage';
import Stats from './stats';

const Main = () => {
  return (
    <Router>
      <div id="mainPage">
        <nav>
          <Link to="/">HomePage</Link>
          <Link to="/play">PLAY</Link>
          <Link to="/stats">Stats</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/play" component={Play} />
          <Route exact path="/stats" component={Stats} />
        </Switch>
      </div>
    </Router>
  )
}

export default Main;

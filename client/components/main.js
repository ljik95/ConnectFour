import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ConnectFour from './connectFour';
import Homepage from './homepage';
import Stats from './stats';
import Instruction from './instruction';
import NotFound from './notFound';
import Pixelogic from './pixelogic';
import Grid8 from './grid8';
import Grid10 from './grid10';

const Main = () => {
  return (
    <Router>
      <div id="mainPage">
        <nav>
          <Link to="/">HomePage</Link>
          <Link to="/instruction">Instructions</Link>
          <Link to="/connectFour">ConnectFour</Link>
          <Link to="/pixelogic">Pixelogic</Link>
          <Link to="/tictactoe">TicTacToe</Link>
          <Link to="/stats">Stats</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/instruction" component={Instruction} />
          <Route exact path="/connectFour" component={ConnectFour} />
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/pixelogic" component={Pixelogic} />
          <Route exact path="/pixelogic/stage2" component={Grid8} />
          <Route exact path="/pixelogic/stage3" component={Grid10} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default Main;

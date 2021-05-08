import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Pages:
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
    </Router>
  );
};

export default App;

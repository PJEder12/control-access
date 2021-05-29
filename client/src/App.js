import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Axios from 'axios';

//Pages:
import Home from './pages/Home';
import Login from './pages/Login';

Axios.defaults.withCredentials = true;

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

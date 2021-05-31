import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

//Pages:
import Register from "./pages/Register";
import Login from "./pages/Login";

//Components
import Navbar from "./components/Navbar";

Axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;

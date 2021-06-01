import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

//Pages:
import Register from "./pages/Register";
import LastUser from "./pages/LastUser";
import History from "./pages/History"
import ModifyUsers from "./pages/ModifyUsers";
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
        <Route exact path="/modifyusers" component={ModifyUsers} />
        <Route exact path="/history" component={History} />
        <Route exact path="/lastuser" component={LastUser} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;

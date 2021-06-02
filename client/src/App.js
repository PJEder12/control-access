import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

//Pages:
// import Register from "./pages/Register";
import LastUser from "./pages/LastUser";
import History from "./pages/History";
import ModifyUsers from "./pages/ModifyUsers";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

//Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRedirect from "./components/LoginRedirect";

Axios.defaults.withCredentials = true;

const App = () => {
  const [is_auth, set_is_auth] = useState(false);
  const [enable, set_enable] = useState(false);
  const is_auth_url = "http://localhost:52000/api/isAuth";

  useEffect(() => {
    Axios.get(is_auth_url).then((response) => {
      const user_info = response.data;
      if (user_info) {
        set_is_auth(true);
        set_enable(true);
      } else {
        set_is_auth(false);
        set_enable(false);
      }
    });
  }, [is_auth]);

  if (is_auth) {
    return (
      <Router>
        <Navbar />
        <Switch>
          <ProtectedRoute
            exact
            path="/modifyusers"
            component={ModifyUsers}
            isAuth={is_auth}
          />
          <ProtectedRoute
            exact
            path="/history"
            component={History}
            isAuth={is_auth}
          />
          <ProtectedRoute
            exact
            path="/lastuser"
            component={LastUser}
            isAuth={is_auth}
          />
          <ProtectedRoute
            exact
            path="/logout"
            component={Logout}
            isAuth={is_auth}
          />
          <LoginRedirect
            exact
            path="/login"
            component={Login}
            isAuth={is_auth}
            enable={enable}
          />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <LoginRedirect
            exact
            path="/login"
            component={Login}
            isAuth={is_auth}
            enable={enable}
          />
          <ProtectedRoute exact path="/modifyusers" component={ModifyUsers} />
          <ProtectedRoute exact path="/history" component={History} />
          <ProtectedRoute exact path="/lastuser" component={LastUser} />
        </Switch>
      </Router>
    );
  }
};

export default App;

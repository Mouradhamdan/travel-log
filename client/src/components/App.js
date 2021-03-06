import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "../pages/auth/RegistrationForm";
import SignInForm from "../pages/auth/SignInForm";
import TopBar from "./layout/TopBar";
import MapPage from "../pages/MapPage";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" render={(props) => <MapPage {...props} user={currentUser} />} />
        <Route exact path="/signup" component={RegistrationForm} />
        <Route exact path="/login" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);

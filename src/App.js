import React, { useState } from "react";
import "./reset.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Establishments from "./containers/Establishments";
import Establishment from "./containers/Establishment";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Publish from "./containers/Publish";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || "");

  const onLogin = (token, username) => {
    setToken(token);
    setUsername(username);
    Cookies.set("token", token);
    Cookies.set("username", username);
  };

  return (
    <Router>
      <Header setToken={setToken} token={token} username={username} />
      <Switch>
        <Route exact path="/">
          <Establishments />
        </Route>
        <Route path="/establishment/:id">
          <Establishment />
        </Route>
        <Route path="/log_in/">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="/sign_up/">
          <SignUp onLogin={onLogin} />
        </Route>
        <Route path="/publish/">
          <Publish />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;

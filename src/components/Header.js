import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../assets/image/happycow.svg";
import { Helmet } from "react-helmet";

import Cookies from "js-cookie";

const Header = ({ token, setToken, username }) => {
  const [searchFocus, setSearchFocus] = useState(false);
  const history = useHistory();

  return (
    <nav>
      <Helmet>
        <title>HappyCow</title>
      </Helmet>
      <ul>
        <div className="header-left">
          <li>
            <Link onFocus={() => setSearchFocus(false)} className="Link" to="/">
              <img alt="Logo" src={Logo} className="logo" />
            </Link>
          </li>
          <li>
            <p>Restaurant & Magasins</p>
          </li>
          <li>
            <p>Soutien</p>
          </li>
        </div>
        <div className="header-right">
          <li>
            <Link
              onFocus={() => setSearchFocus(false)}
              className="Link"
              to="/publish"
            >
              <div className="publish-button">Ajouter une annonce</div>
            </Link>
          </li>
          {!token ? (
            <Link
              onFocus={() => setSearchFocus(false)}
              className="Link login"
              to="/log_in"
            >
              <div className="logIn-button">Se connecter / S'inscrire</div>
            </Link>
          ) : (
            <div
              onClick={() => {
                setToken(null);
                Cookies.remove("token");
                Cookies.remove("username");
                history.push("/");
              }}
              onFocus={() => setSearchFocus(false)}
              className="Link login"
            >
              <div className="user-offer-button">
                <p>{username}</p>
                Se déconnecter
              </div>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Header;

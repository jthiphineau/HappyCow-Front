import React, { useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const history = useHistory();

  const handleSignupSubmit = async e => {
    try {
      e.preventDefault();
      if (
        !username ||
        !email ||
        !country ||
        !password ||
        !confirmPassword ||
        !checkbox
      ) {
        alert("Veuillez remplir tous les champs");
      } else if (password !== confirmPassword) {
        alert("Vos mots de passe ne sont pas identiques");
      } else if (!checkbox) {
        alert("Veuillez accepter les CGV et CGU");
      } else {
        const response = await axios.post(
          "https://happycow-backend-jt.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            country: country,
            password: password
          }
        );
        // console.log(response.data);

        if (response.data.token) {
          onLogin(response.data.token, response.data.account.username);
          history.push("/");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="title">CRÉER UN COMPTE</div>
        <form onSubmit={handleSignupSubmit}>
          <p>Nom de l'utilisateur *</p>
          <input type="text" onChange={e => setUsername(e.target.value)} />
          <p>Pays *</p>
          <input type="text" onChange={e => setCountry(e.target.value)} />
          <p>Adresse email *</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
          <div className="password-and-confirm">
            <div>
              <p>Mot de passe *</p>
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <p>Confirmer le mot de passe *</p>
              <input
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="check-and-accept-conditions">
            <input onChange={() => setCheckbox(!checkbox)} type="checkbox" />
            <p>
              « J’accepte les <span>Conditions Générales de Vente </span> et les{" "}
              <span>Conditions Générales d’Utilisation »</span>
            </p>
          </div>

          <input value="Créer mon Compte Personnel" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;

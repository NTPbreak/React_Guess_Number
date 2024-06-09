import React, { useState } from "react";
import "../css/Parametre.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Joueur from "./Joueur.ts";
import Score from "./Score.ts";

const handleToForm = (activeParametre) => {
  Joueur.clearConnectedUser();
  activeParametre(false);
  window.location.reload();
};

const Parametre = ({ activeParametre, active }) => {
  var joueur = Joueur.getConnectedUser();
  const [username, setUsername] = useState(joueur.username || "");
  const [password, setPassword] = useState(joueur.password || "");
  const [intervalA, setIntervalA] = useState(joueur.intervaleA || 1);
  const [intervalB, setIntervalB] = useState(joueur.intervaleB || 100);

  const handleSave = () => {
    Joueur.updateConnectedUser(username, password, intervalA, intervalB);
    Score.updateScoresForUser(joueur.username,Joueur.getConnectedUser(),joueur);

    alert("Paramètres sauvegardés !");
    window.location.reload(); 
  };

  return (
    <div
      className={`cont_parametre ${
        active ? "parametre-slide-in" : "parametre-slide-out"
      }`}
    >
      <h3>Paramètres</h3>
      <div className="param-form">
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Intervalle A</label>
          <input
            type="number"
            className="form-control"
            value={intervalA}
            onChange={(e) => setIntervalA(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Intervalle B</label>
          <input
            type="number"
            className="form-control"
            value={intervalB}
            onChange={(e) => setIntervalB(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-guess" onClick={handleSave}>
            Sauvegarder
          </button>
          <button
            className="btn btn-guess-second"
            onClick={() => handleToForm(activeParametre)}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parametre;

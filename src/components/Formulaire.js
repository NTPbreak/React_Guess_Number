// import React, { useState } from "react";
import Joueur from "./Joueur.ts";
import $, { isEmptyObject } from "jquery";
import "../css/Formulaire.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Score from "./Score.ts";
import { useState } from "react";

const handleSignin = (event) => {
  event.preventDefault();
  // Récupérer les valeurs des champs de saisie
  const nomComplet = event.target.querySelector(
    'input[name="nomComplet"]'
  ).value;
  const password = event.target.querySelector('input[name="password"]').value;
  var isValid = !isEmptyObject(nomComplet) && !isEmptyObject(password);
  const error_Message = $("#error_message");

  if (isValid) {
    // Stocker le joueur dans localStorage
    if (Joueur.findJoueurByUsername(nomComplet)) {
      error_Message.text("Il existe deja un joueur  avec ce nom");
    } else {
      // Créer un objet Joueur avec les informations récupérées
      const joueur = new Joueur(nomComplet, password);
      joueur.save();
      // let score = new Score(joueur);
      // score.save();
      window.location.reload();
    }
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  // Récupérer les valeurs des champs de saisie
  const nomComplet = event.target.querySelector(
    'input[name="nomComplet"]'
  ).value;
  const password = event.target.querySelector('input[name="password"]').value;
  var isValid = !isEmptyObject(nomComplet) && !isEmptyObject(password);
  const error_Message = $("#error_message");

  if (isValid) {
    // Créer un objet Joueur avec les informations récupérées
    // const joueur = new Joueur(nomComplet, password, 1, 0,1,100);

    // Stocker le joueur dans localStorage
    if (Joueur.findJoueurByUsername(nomComplet, password)) {
      var joueur = Joueur.findJoueurByUsername(nomComplet, password);
      Joueur.setConnectedUser(joueur.username, joueur.password);
      // Rediriger vers la page d'accueil
      window.location.href = "/";
    } else {
      error_Message.text("Aucun joueur trouver avec ces informations");
    }
  }
};

const FormulaireSignin = ({ sign }) => {

  return (
    <div className="container" style={{ paddingTop: "100px", padding: "2%" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card container_dev_Form">
            <div className="card-header mb-2">
              <h1 className="text_form h4 pt-2">Guess The Number</h1>
            </div>
            <div className="card-body">
              <div className="part2">
                <form onSubmit={handleSignin}>
                  <h2 className="text-center" style={{ fontWeight: "520" }}>
                    S'enregistrer
                  </h2>
                  <div className="mb-4 mt-5 d-flex justify-content-center align-items-center">
                    <label
                      htmlFor="Nomcomplet"
                      className="form-label bg-primary p-1 fw-bold w-50 text-white rounded"
                    >
                      Nom complet
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="nomComplet"
                      id="Nomcomplet"
                      required
                    />
                  </div>
                  <div className="mb-5 d-flex justify-content-center  align-items-cente">
                    <label
                      htmlFor="Nomcomplet"
                      className="form-label bg-primary p-1 fw-bold w-50 text-white rounded"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="Password"
                      required
                    />
                  </div>
                  <div id="error_container">
                    <p className="text-danger" id="error_message"></p>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-success fs-6 mb-2" type="submit">
                      S'enregistrer
                    </button>
                    <span className="ms-2">
                      <a
                        href="#!"
                        onClick={() => {
                          sign(!this);
                        }}
                      >
                        Se connecter
                      </a>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Formulaire = () => {

  const [sign, setSign] = useState(true);
  return (
    <div className="container" style={{ paddingTop: "100px", padding: "2%" }}>
      {sign ? (
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card container_dev_Form">
              <div className="card-header mb-2">
                <h1 className="text_form h4 pt-2">Guess The Number</h1>
              </div>
              <div className="card-body">
                <div className="part2">
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-center" style={{ fontWeight: "520" }}>
                      Identification
                    </h2>
                    <div className="mb-4 mt-5 d-flex justify-content-center align-items-center">
                      <label
                        htmlFor="Nomcomplet"
                        className="form-label bg-primary p-1 fw-bold w-50 text-white rounded"
                      >
                        Nom complet
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="nomComplet"
                        id="Nomcomplet"
                        required
                      />
                    </div>
                    <div className="mb-5 d-flex justify-content-center  align-items-cente">
                      <label
                        htmlFor="Nomcomplet"
                        className="form-label bg-primary p-1 fw-bold w-50 text-white rounded"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="Password"
                        required
                      />
                    </div>
                    <div id="error_container">
                      <p className="text-danger" id="error_message"></p>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-success fs-6 mb-2"
                        type="submit"
                      >
                        Validation
                      </button>
                      <div>
                        Si vous n'avez pas de compte?
                        <a
                          href="#!"
                          onClick={() => {
                            setSign(!sign);
                          }}
                        >
                          S'incrire
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FormulaireSignin sign={setSign} />
      )}
    </div>
  );
};

export default Formulaire;

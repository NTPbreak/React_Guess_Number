/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-multi-str */
import React, { useState } from "react";
import "../css/App.css";
import NavBar from "./NavBar.js";
import Formulaire from "./Formulaire";
// import Parametre from './Parametre.tsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Joueur from "./Joueur.ts";
import SelectNiveau from "./SelectNiveau.js";
import MainGame from "./MainGame.js";
import Parametre from "./Parametre.js";
import Score from "./Score.ts";
import TableauScore from "./TableauScore.js";

const App = () => {
  // Joueur.clear()

  const [play, setPlay] = useState(false);
  const [joueur, setJoueur] = useState(
    Joueur.getConnectedUser() != null ? Joueur.getConnectedUser() : null
  );
  const [choix_niveau, setchoix_niveau] = useState(0);
  const [activeParametre, setActiveParametre] = useState(false);
  const [point, setPoint] = useState(
    Score.getLastScoreForUser(Joueur.getConnectedUser()?.username)?.point || 0
  );

  const [activeTabScore, setActiveTabScore] = useState(false);

  // Ajoute une classe au body pour désactiver le scroll
  const disableScroll = () => {
    document.body.classList.add("disable-scroll");
  };

  // Supprime la classe du body pour réactiver le scroll
  const enableScroll = () => {
    document.body.classList.remove("disable-scroll");
  };
  const handleActiveParametre = () => {
    if (activeParametre === false) {
      setActiveParametre(true);
      disableScroll();
    } else {
      setActiveParametre(false);
      enableScroll();
    }
    console.log(activeParametre);
  };

  const handleActiveTabScore = () => {
    if (activeTabScore === false) {
      setActiveTabScore(true);
      setActiveParametre(false)
      disableScroll();
    } else {
      setActiveTabScore(false);

      enableScroll();
    }
  };

  const handleChangePlay = () => {
    if (play === false) {
      setPlay(true);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Pour un défilement en douceur
      });
      setchoix_niveau(0);
      setPlay(false);
    }
  };
  var help = useState("");
  if (joueur != null) {
    help =
      "Salut " +
      joueur.username +
      ", Les regles sont  simple je vous propose de deviner ❓ un nombre au quel je pense 🤔 et vous \
essayer de le trouver 🔎 par tout les moyens mais sachez que vous devez le trouver avant le nombre 🧮 de \
tentative maximale atteinte  🔥";
  }

  return (
    <div
      style={{
        width: "100%",
        height: "max-content",
        maxHeight: "max-content",
        paddingBottom: "100px",
      }}
      className="App"
    >
      {joueur !== null ? (
        <>
          <NavBar
            activeParametre={handleActiveParametre}
            Score={point}
            activeTabScore={handleActiveTabScore}
          />
          {activeTabScore && <TableauScore visible={activeTabScore} />}

          <div className="fade-in" />
          {play === false && (
            <div className="container fade-in">
              <h1
                style={{ marginTop: "85px" }}
                className="fw-bold text-white text-decoration-underline fade-in"
                id="begin_Play"
              >
                Un jeu de reflexion 🧠
              </h1>
              <div className="help_content container fade-in">
                <p className="help">{help}</p>
              </div>
              <button
                className="btn btn-outline-light fw-bold btn_play"
                onClick={handleChangePlay}
              >
                Commencer
              </button>
            </div>
          )}

          {play !== false && choix_niveau === 0 && (
            <div className="container-fluid fade-in">
              <SelectNiveau setchoix_niveau={setchoix_niveau} />
            </div>
          )}

          {play !== false && choix_niveau !== 0 && (
            <MainGame
              niveau={choix_niveau}
              Min={joueur.intervaleA}
              Max={joueur.intervaleB}
              setScore={setPoint}
              Score={point}
            />
          )}
          {play !== false && (
            <button
              className="btn btn-outline-light fw-bold mt-5 btn_play "
              onClick={handleChangePlay}
              id="return_help"
            >
              Menue
            </button>
          )}
        </>
      ) : (
        <Formulaire />
      )}
      {activeParametre && (
        <div className="container-fluid fade-in">
          <Parametre
            activeParametre={setActiveParametre}
            active={activeParametre}
          />
        </div>
      )}
    </div>
  );
};

export default App;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "bootstrap";
import { Button, InputGroup, FormControl, FormLabel } from "react-bootstrap";
import "../css/MainGame.css";
import Score from "./Score.ts";
import Joueur from "./Joueur.ts";

const MainGame = ({ niveau, Min, Max, setScore }) => {
  const [min, setMin] = useState(Min);
  const [max, setMax] = useState(Max);
  const [guess, setGuess] = useState(getRandomNumber(min, max));
  const init_MessageGuide = `Devinez 🔎  le nombre entre ${min} et ${max}. Faites de votre mieux!`;
  const init_message = `Je pense à un nombre entre ${min} et ${max}`;
  const [message_guide, setmessage_guide] = useState(init_MessageGuide);
  const [stateGame, setStateGame] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  console.log(niveau);
  const [message, setmessage] = useState(init_message);

  // Fonction pour générer un nombre aléatoire entre min et max
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleTentative = (pourcentage) => {
    const progressBar = document.getElementById("progress_bar");

    progressBar.style.cssText = `width:${Math.floor(pourcentage)}%`;
    console.log(pourcentage);
  };

  const handleChangeStateGame = (tentativeUser, tentativeTotal) => {
    const PointMax33 = 1000;
    const PointMax66 = 500;
    const PointMax90 = 100;
    const PointMax100Win = 35;
    const PointMax100 = 0;

    const Tentative33 = (33 * tentativeTotal) / 100;
    const Tentative66 = (66 * tentativeTotal) / 100;
    const Tentative90 = (90 * tentativeTotal) / 100;

    if (tentativeUser <= Tentative33) {
      return PointMax33 * (1 - (tentativeUser - 1) / Tentative33);
    } else if (tentativeUser > Tentative33 && tentativeUser <= Tentative66) {
      return (
        PointMax66 *
        (1 - (tentativeUser - Tentative33 - 1) / (Tentative66 - Tentative33))
      );
    } else if (tentativeUser > Tentative66 && tentativeUser <= Tentative90) {
      return (
        PointMax90 *
        (1 - (tentativeUser - Tentative66 - 1) / (Tentative90 - Tentative66))
      );
    } else if (tentativeUser <= tentativeTotal) {
      return PointMax100Win;
    } else {
      return PointMax100;
    }
  };

  const what_Level_Try = (niveau) => {
    var Level1 = Math.floor(Math.log2(max - min)) + 1;
    var level3 = Math.floor(Level1 / 2) + 1;
    var level2 = Math.floor((Level1 + level3) / 2) + 1;

    if (niveau === 1) {
      return Level1;
    } else if (niveau === 2) {
      return level2;
    } else return level3;
  };
  const what_niveau = (niveau) => {
    if (niveau === 1) return "Facile";
    else if (niveau === 2) return "Moyen";
    else return "Difficile";
  };

  const numTentative = what_Level_Try(niveau);
  const [userTentative, setUserTentative] = useState(1);

  const changeMessage = (event) => {
    event.preventDefault();
    var userGuess = event.target.querySelector('input[name="Guess"]').value;
    if (userGuess !== "") {
      setErrorVisible(false);

      if (userTentative <= numTentative) {
        if (userGuess < guess) {
          setmessage(
            `Le nombre que j'ai en tête est plus grand que ${userGuess}. Essaie encore !`
          );
          setUserTentative(userTentative + 1);

          handleTentative((userTentative * 100) / numTentative);
        } else if (userGuess > guess) {
          setmessage(
            `Le nombre que j'ai en tête est plus petit que ${userGuess}. Essaie encore !`
          );
          setUserTentative(userTentative + 1);
          handleTentative((userTentative * 100) / numTentative);
        } else {
          setmessage_guide(
            `Félicitations 🎉 ! Tu as trouvé le bon nombre en ${userTentative} essai(s).`
          );
          setUserTentative(userTentative + 1);

          handleTentative((userTentative * 100) / numTentative);

          setStateGame(false);

          const point = handleChangeStateGame(userTentative, numTentative);
          const score = new Score(
            Joueur.getConnectedUser(),
            Math.round(point),
            niveau,
            userTentative
          );
          score.save();
          setScore(point);
        }
      } else {
        setmessage_guide(
          `Désolé 😢, tu as dépassé ⏳ le nombre d'essais autorisés.`
        );
        setStateGame(false);
        const point = handleChangeStateGame(userTentative, numTentative);
        const score = new Score(
          Joueur.getConnectedUser(),
          Math.round(point),
          niveau,
          userTentative
        );
        score.save();
        setScore(point);
      }
    } else {
      setErrorVisible(true);
    }

    console.log(numTentative + " " + userTentative);
  };

  console.log(guess);

  //reinitialisation du jeu
  const retry_game = () => {
    setStateGame(true);
    handleTentative(0);
    setUserTentative(1);
    setGuess(getRandomNumber(min, max));
    setmessage(init_message);
    setmessage_guide(init_MessageGuide);
  };

  return (
    <div className="game-container">
      <div className="container_dev_game">
        <div className="container_indicator">
          <small>
            <span className="fw-bold">Niveau:</span> {what_niveau(niveau)}
          </small>

          <small>
            <span className="fw-bold"> Nombre de tentative restante: </span>
            {numTentative - userTentative + 1}
          </small>
        </div>
        <div className="progress-container">
          <h2 className="fw-bold title">Tentatives</h2>
          <div className="progress-bar-container">
            <div className="progress-bar" id="progress_bar"></div>
          </div>
        </div>
        <div className="header">
          <div className="question-container">
            <div className="question">
              <p className="Message_Guide"> {message_guide}</p>
            </div>
            {stateGame ? (
              <div className="message">
                <small className="message_text">{message}</small>
              </div>
            ) : (
              <div className="message">
                <small className="message_text">Le nombre était: {guess}</small>
              </div>
            )}
          </div>
        </div>
        <form
          className="response-container d-flex flex-column"
          onSubmit={changeMessage}
        >
          {stateGame ? (
            <>
              <InputGroup className="mb-3 response-container-group">
                <FormControl
                  className="response-input"
                  type="number"
                  placeholder="Votre réponse"
                  id="Guess"
                  name="Guess"
                />
                <Button className="response-btn" type="submit">
                  Valider
                </Button>
              </InputGroup>
              {errorVisible && (
                <FormLabel className="text-danger">
                  Veuillez entrer un nombre
                </FormLabel>
              )}
            </>
          ) : (
            <Button className="response-retry " onClick={retry_game}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
              </svg>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MainGame;

/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import sukuna from "../images/sukuna.png";
import sakura from "../images/sakura.png";
import natsu from "../images/natsu.png";
import Joueur from "./Joueur.ts";

function SetTentative(max, min, niveau) {
  // if (niveau === 2) {
  //   max = max * 10;
  //   min = min * 10;
  // } else if (niveau === 3) {
  //   max = max * 100;
  //   min = min * 100;
  // }
  const tentativeFacile = Math.floor(Math.log2(max - min)) + 1;
  const tentativeDifficile = Math.floor(tentativeFacile / 2) + 1;
  const tentativeMoyen =
    Math.floor((tentativeDifficile + tentativeFacile) / 2) + 1;

  switch (niveau) {
    case 1:
      return tentativeFacile;
    case 2:
      return tentativeMoyen;
    default:
      return tentativeDifficile;
  }
}
const SelectNiveau = ({ setchoix_niveau }) => {
  const joueur = Joueur.getConnectedUser();
  const [selectedNiveau, setSelectedNiveau] = useState("");
  const [play, setPlay] = useState(false);
  const tentativeFacile = SetTentative(joueur.intervaleB, joueur.intervaleA, 1);
  const tentativeMoyen = SetTentative(joueur.intervaleB, joueur.intervaleA, 2);
  const tentativeDifficile = SetTentative(
    joueur.intervaleB,
    joueur.intervaleA,
    3
  );

  const what_niveau = (niveau) => {
    if (niveau === "Facile") return 1;
    else if (niveau === "Moyen") return 2;
    else return 3;
  };

  const handleGameWithNiveau = (event) => {
    const niveau = event.target.getAttribute("data-niveau");
    setchoix_niveau(what_niveau(niveau));
    joueur.niveau = niveau;
    setPlay(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Pour un défilement en douceur
    });
    console.log(niveau);
    enableScroll();
  };

  const disableScroll = () => {
    document.body.classList.add("disable-scroll");
  };
  const enableScroll = () => {
    document.body.classList.remove("disable-scroll");
  };
  const handleClick = (event) => {
    const datatype = event.target.getAttribute("datatype");

    // Supprimer la classe select_dev de tous les conteneurs avant de l'appliquer au nouveau
    const containers = document.querySelectorAll(".container_dev");

    containers.forEach((container) => {
      container.classList.remove("select_dev");
    });

    setSelectedNiveau(datatype === selectedNiveau ? "" : datatype);
    if (selectedNiveau !== "") enableScroll();
    else disableScroll();
  };

  return (
    <>
      <>
        <div className="text-center py-5">
          <h2 className=" text-white fw-bold">
            Choisissez un niveau {joueur.username}
          </h2>
        </div>
        <div className="container fade-in select_niveau mt-5" id="cont_root">
          {/*Niveau Facile*/}

          <div
            className={`container container_dev  ${
              selectedNiveau === "Facile" ? "select_dev" : ""
            }`}
            style={{ width: "300px" }}
          >
            <div className="container d-flex flex-column align-items-center">
              <img
                srcSet={sakura}
                alt="image sukuna"
                style={{
                  width: "350px",
                  height: "400px",
                  objectFit: "contain",
                }}
              />
              <div className="details">
                <h1 className="h1_dev" style={{ color: "white" }}>
                  Facile
                </h1>
                <div className="explain" style={{ display: "none" }}>
                  <p className="text-white">
                    Dans ce niveau vous aurez droit a {tentativeFacile}{" "}
                    tentative(s) pour trouver mon nombre
                  </p>
                  <button
                    className="btn btn-light fw-bold"
                    data-niveau="Facile"
                    onClick={handleGameWithNiveau}
                  >
                    Joueur
                  </button>{" "}
                </div>
              </div>
            </div>

            <div style={{ display: "initial" }}>
              <button
                className="button_dev"
                datatype="Facile"
                onClick={handleClick}
              >
                {selectedNiveau === "Facile" ? "Sortir" : "Selectionner"}
              </button>
            </div>
          </div>

          {/*Niveau Difficile*/}

          <div
            className={`container container_dev  ${
              selectedNiveau === "Moyen" ? "select_dev" : ""
            }`}
            style={{ width: "300px" }}
          >
            <div className="container d-flex flex-column align-items-center">
              <img
                srcSet={natsu}
                alt="image sukuna"
                style={{
                  width: "350px",
                  height: "400px",
                  objectFit: "contain",
                }}
              />{" "}
              <div className="details">
                {" "}
                <h1 className="h1_dev" style={{ color: "white" }}>
                  Moyen
                </h1>
                <div className="explain" style={{ display: "none" }}>
                  <p className="text-white">
                    Ici vous n'aurez qu'un minimun de {tentativeMoyen}{" "}
                    tentative(s) pour trouver mon nombre
                  </p>
                  <button
                    className="btn btn-light fw-bold"
                    data-niveau="Moyen"
                    onClick={handleGameWithNiveau}
                  >
                    Joueur
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: "initial" }}>
              <button
                className="button_dev"
                datatype="Moyen"
                onClick={handleClick}
              >
                {selectedNiveau === "Moyen" ? "Sortir" : "Selectionner"}
              </button>
            </div>
          </div>

          {/* Niveau Difficile Sukuna */}

          <div
            className={`container container_dev for_blur ${
              selectedNiveau === "Difficile" ? "select_dev" : ""
            }`}
            style={{ width: "300px" }}
          >
            <div className="container d-flex flex-column align-items-center">
              <img
                srcSet={sukuna}
                alt="image sukuna"
                style={{
                  width: "350px",
                  height: "400px",
                  objectFit: "contain",
                }}
              />{" "}
              <div className="details">
                {" "}
                <h1 className="h1_dev" style={{ color: "white" }}>
                  Difficile
                </h1>
                <div className="explain" style={{ display: "none" }}>
                  <p className="text-white">
                    Ici vous n'aurez qu'un minimun de {tentativeDifficile}{" "}
                    tentative(s) pour trouver mon nombre
                  </p>
                  <button
                    className="btn btn-light fw-bold"
                    data-niveau="Difficile"
                    onClick={handleGameWithNiveau}
                  >
                    Joueur
                  </button>{" "}
                </div>
              </div>
            </div>

            <div className="btn_decesion">
              <button
                className="button_dev"
                datatype="Difficile"
                onClick={handleClick}
              >
                {selectedNiveau === "Difficile" ? "sortir" : "Selectionner"}
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default SelectNiveau;

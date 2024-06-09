import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/TableauScore.css";
import Score from "./Score.ts";
import Joueur from "./Joueur.ts";

 const what_niveau = (niveau) => {
   if (niveau === 1) return "Facile";
   else if (niveau === 2) return "Moyen";
   else return "Difficile";
 };

const TableauScore = ({ visible }) => {
  const connectedUser = Joueur.getConnectedUser();
  const scores = connectedUser
    ? Score.getAndSortScoresForUser(connectedUser.username)
    : [];

  return (
    <div className="container_score container">
      <table className="table-responsive table-transparent">
        <thead>
          <tr>
            <th className="underline">Rang</th>
            <th className="underline">Niveau</th>
            <th className="underline">Points</th>
            <th className="underline">Tentatives</th>
            <th className="underline">Intervale</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>{index === 0 && score.point > 0 ? "⭐"+ parseInt(index+1)  : index + 1}</td>
              <td>{what_niveau(score.niveau)}</td>
              <td>{score.point}</td>
              <td>{score.numTentative}</td>
              <td>{`${score.joueur.intervaleA} - ${score.joueur.intervaleB}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableauScore;

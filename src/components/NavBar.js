/* eslint-disable jsx-a11y/anchor-is-valid */
import {React} from "react";
import {
  FaTools,FaTable

} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"


const NavBar = ({ activeParametre, Score, activeTabScore }) => {
  var score = Math.round(Score) || 0;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="div_left d-flex ">
          <a className="navbar-brand" href="#!">
            Guess The Number
          </a>
        </div>
        <h5
          id="score"
          style={{ paddingRight: "130px", paddingTop: "10px" }}
          className="fw-bold"
        >
          Score: {score} Point(s)
        </h5>

        <div className="div_right d-flex">
          <button
            className="btn btn-outline-success me-4"
            title="Afficher le tableau de score"
            type="submit"
            onClick={activeTabScore}
          >
            <FaTable />
          </button>

          <button
            className="btn btn-outline-success"
            title="Parametre de jeu"
            type="submit"
            onClick={activeParametre}
          >
            <FaTools />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import Card from "./Card";
import "./Game.css";
import useCards from "./useCards";

interface Props {
  title: string;
}

function Game({ title }: Props) {
  const [state, play] = useCards();

  const infoStyles = {
    color: state.playersTurn ? "black" : "darkgrey",
    backgroundColor: state.playersTurn ? "lightyellow" : "white",
  };

  return (
    <>
      <h1>{title}</h1>
      <div className="info" style={infoStyles}>
        {state.playersTurn ? "Du bist" : "Der Computer is"} an der Reihe
      </div>
      <div className="cards">
        {state.player[0] && (
          <Card
            animal={state.player[0]}
            uncovered={true}
            selectedProperty={state.selectedProperty}
            onSelectProperty={play}
          />
        )}
        {state.computer[0] && (
          <Card
            animal={state.computer[0]}
            uncovered={state.computerUncovered}
            selectedProperty={state.selectedProperty}
          />
        )}
      </div>
    </>
  );
}

export default Game;

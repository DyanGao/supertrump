import React from "react";
import Card from "./Card";
import "./Game.css";
import useCards from "./useCards";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";

interface Props {
  title: string;
}

function Game({ title }: Props) {
  const intl = useIntl();
  const [state, play] = useCards();

  const infoStyles = {
    color: state.playersTurn ? "black" : "darkgrey",
    backgroundColor: state.playersTurn ? "lightyellow" : "white",
  };

  let info = intl.formatMessage({ id: "game.computerTurn" });
  if (state.playersTurn) {
    const messages = defineMessages({ yourTurn: { id: "game.yourTurn" } });
    info = intl.formatMessage(messages.yourTurn);
  }

  return (
    <>
      <h1>{title}</h1>
      <div className="info" style={infoStyles}>
        <FormattedMessage id="game.info" values={{ info }} />
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

import { useState, useEffect } from "react";
import update from "immutability-helper";
import axios from "axios";
import Animal from "../shared/models/Animal";
import selectRandomProperty from "./selectRandomProperty";

//import DealCards from "./withCards";
/* interface Card {
  name: string;
  image: string;
  size: number;
  weight: number;
  age: number;
  offspring: number;
  speed: number;
} */

interface State {
  computerUncovered: boolean;
  selectedProperty?: keyof Animal | "";
  playersTurn: boolean;
  player: Animal[];
  computer: Animal[];
}

function useCards(): [State, (property: keyof Animal) => void] {
  const [state, setState] = useState<State>({
    computerUncovered: false,
    selectedProperty: "",
    playersTurn: true,
    player: [],
    computer: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3001/card");
      dealCards(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (state.selectedProperty !== "") {
      setTimeout(() => {
        compare(state.selectedProperty as keyof Animal);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedProperty]);

  useEffect(() => {
    if (
      state.computerUncovered === false &&
      state.selectedProperty === "" &&
      state.playersTurn === false
    ) {
      setTimeout(() => {
        const property = selectRandomProperty();
        play(property);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.computerUncovered, state.selectedProperty, state.playersTurn]);

  function compare(property: keyof Animal) {
    let playersTurn = state.playersTurn;
    const firstPlayer = state.player[0];
    let player = update(state.player, {
      $splice: [[0, 1]],
    });
    const firstComputer = state.computer[0];
    let computer = update(state.computer, {
      $splice: [[0, 1]],
    });

    if (firstPlayer[property]! > firstComputer[property]!) {
      playersTurn = true;
      player = update(player, {
        $push: [firstPlayer, firstComputer],
      });
      if (computer.length === 0) {
        alert("Player wins");
        return;
      }
    } else if (firstPlayer[property]! < firstComputer[property]!) {
      playersTurn = false;
      computer = update(computer, {
        $push: [firstPlayer, firstPlayer],
      });
      if (player.length === 0) {
        alert("Computer wins");
        return;
      }
    } else {
      player = update(player, {
        $push: [firstPlayer],
      });
      computer = update(computer, {
        $push: [firstComputer],
      });
    }
    setState(
      (state) =>
        update(state, {
          $set: {
            computerUncovered: false,
            selectedProperty: "",
            playersTurn,
            player,
            computer,
          },
        })
      // () => {
      //   if (!playersTurn) {
      //     setTimeout(() => {
      //       const property = selectRandomProperty();
      //       play(property);
      //     }, 2000);
      //   }
      // }
    );
  }

  function play(property: keyof Animal) {
    setState(
      (state) =>
        update(state, {
          selectedProperty: {
            $set: property,
          },
          computerUncovered: {
            $set: true,
          },
        })
      // () => {
      //   setTimeout(() => {
      //     compare(property);
      //   }, 2000);
      // }
    );
  }

  function dealCards(cards: Animal[]) {
    const computer: Animal[] = [];
    const player: Animal[] = [];

    cards.forEach((card, index) => {
      const animal = new Animal(
        card.name,
        card.image,
        card.size,
        card.weight,
        card.age,
        card.offspring,
        card.speed
      );
      if (index % 2 === 0) {
        computer.push(animal);
      } else {
        player.push(animal);
      }
    });
    setState((prevState) =>
      update(prevState, {
        player: {
          $set: player,
        },
        computer: {
          $set: computer,
        },
      })
    );
  }

  return [state, play];
}

export default useCards;

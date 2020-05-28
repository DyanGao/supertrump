import { createSelector } from "reselect";
import { AppState } from "./../../reducers/rootReducer";
import Animal from "../../shared/models/Animal";

export function getCards(state: AppState): Animal[] {
  return state.admin.cards;
}

export function onolyFavourites(state: AppState): boolean {
  return state.admin.onlyFavourites;
}

export function getCard(state: AppState): (id?: number) => Animal {
  return (id?: number): Animal => {
    const animal = getCards(state).find((card) => card.id === id);
    if (!animal) {
      return new Animal("", "", "", "", "", "", "");
    }
    return animal;
  };
}

export const getFavourites = createSelector(
  [getCards, onolyFavourites],
  (cards, onolyFavourites) => {
    if (onolyFavourites) {
      return cards.filter((card) => card.favourite);
    }
    return cards;
  }
);

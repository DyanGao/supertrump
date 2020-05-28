import update from "immutability-helper";
import Animal from "../../shared/models/Animal";
import cards from "./cards";
import { ActionType } from "typesafe-actions";
import {
  deleteCardAction,
  createCardAction,
  updateCardAction,
  DELETE_CARD,
  CREATE_CARD,
  UPDATE_CARD,
} from "../actions/admin.actions";

export interface State {
  cards: Animal[];
  onlyFavourites: boolean;
}

export default function (
  state: State = { cards: cards, onlyFavourites: false },
  action: ActionType<
    typeof deleteCardAction | typeof createCardAction | typeof updateCardAction
  >
): State {
  switch (action.type) {
    case DELETE_CARD:
      const filteredCards = state.cards.filter(
        (card) => card.id !== action.payload
      );
      return update(state, { cards: { $set: filteredCards } });
    case CREATE_CARD:
      const nextId =
        Math.max.apply(null, state.cards.map((card) => card.id) as number[]) +
        1;
      const newCard = update(action.payload, { id: { $set: nextId } });
      return update(state, { cards: { $push: [newCard] } });
    case UPDATE_CARD:
      const cardIndex = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      return update(state, {
        cards: { [cardIndex]: { $set: action.payload } },
      });
    default:
      return state;
  }
}

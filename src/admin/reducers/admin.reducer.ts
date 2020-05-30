import update from "immutability-helper";
import Animal from "../../shared/models/Animal";
//import cards from "./cards";
import { ActionType } from "typesafe-actions";
import {
  deleteCardSuccessAction,
  createCardSuccessAction,
  updateCardSuccessAction,
  DELETE_CARD_SUCCESS,
  CREATE_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  LOAD_CARDS_SUCCESS,
  loadCardsSuccessAction,
  ERROR,
  errorAction,
} from "../actions/admin.actions";

export interface State {
  cards: Animal[];
  onlyFavourites: boolean;
  error: string;
}

export default function (
  state: State = { cards: [], onlyFavourites: false, error: "" },
  action: ActionType<
    | typeof deleteCardSuccessAction
    | typeof createCardSuccessAction
    | typeof updateCardSuccessAction
    | typeof loadCardsSuccessAction
    | typeof errorAction
  >
): State {
  switch (action.type) {
    case DELETE_CARD_SUCCESS:
      const filteredCards = state.cards.filter(
        (card) => card.id !== action.payload
      );
      return update(state, { cards: { $set: filteredCards } });
    case CREATE_CARD_SUCCESS:
      const nextId =
        Math.max.apply(null, state.cards.map((card) => card.id) as number[]) +
        1;
      const newCard = update(action.payload, { id: { $set: nextId } });
      return update(state, { cards: { $push: [newCard] } });
    case UPDATE_CARD_SUCCESS:
      const cardIndex = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      return update(state, {
        cards: { [cardIndex]: { $set: action.payload } },
      });
    case LOAD_CARDS_SUCCESS:
      return update(state, { cards: { $set: action.payload } });
    case ERROR:
      return update(state, {
        error: { $set: action.payload },
      });
    default:
      return state;
  }
}

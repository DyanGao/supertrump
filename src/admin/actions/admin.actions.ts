import { deprecated, ActionType } from "typesafe-actions";
import Animal from "../../shared/models/Animal";

export const LOAD_CARDS = "LOAD_CARDS";
export type LOAD_CARDS = typeof LOAD_CARDS;
export const LOAD_CARDS_SUCCESS = "LOAD_CARDS_SUCCESS";
export type LOAD_CARDS_SUCCESS = typeof LOAD_CARDS_SUCCESS;

export const ERROR = "ERROR";
export type ERROR = typeof ERROR;

export const DELETE_CARD_SUCCESS = "DELETE_CARD_SUCCESS";
export type DELETE_CARD_SUCCESS = typeof DELETE_CARD_SUCCESS;
export const DELETE_CARD = "DELETE_CARD";
export type DELETE_CARD = typeof DELETE_CARD;

export const CREATE_CARD_SUCCESS = "CREATE_CARD_SUCCESS";
export type CREATE_CARD_SUCCESS = typeof CREATE_CARD_SUCCESS;
export const CREATE_CARD = "CREATE_CARD";
export type CREATE_CARD = typeof CREATE_CARD;

export const UPDATE_CARD_SUCCESS = "UPDATE_CARD_SUCCESS";
export type UPDATE_CARD_SUCCESS = typeof UPDATE_CARD_SUCCESS;
export const UPDATE_CARD = "UPDATE_CARD";
export type UPDATE_CARD = typeof UPDATE_CARD;

/* export interface DeleteCardAction {
  type: DELETE;
  payload: number;
}

export function deleteCardAction(id: number): DeleteCardAction {
  return {
    type: DELETE as DELETE,
    payload: id,
  };
} */
const { createStandardAction } = deprecated;

export const loadCardsAction = createStandardAction(LOAD_CARDS)<void>();
export const loadCardsSuccessAction = createStandardAction(LOAD_CARDS_SUCCESS)<
  Animal[]
>();

export const errorAction = createStandardAction(ERROR)<string>();

export const deleteCardAction = createStandardAction(DELETE_CARD)<number>();
export const deleteCardSuccessAction = createStandardAction(
  DELETE_CARD_SUCCESS
)<number>();

export const createCardAction = createStandardAction(CREATE_CARD)<Animal>();
export const createCardSuccessAction = createStandardAction(
  CREATE_CARD_SUCCESS
)<Animal>();

export const updateCardAction = createStandardAction(UPDATE_CARD)<Animal>();
export const updateCardSuccessAction = createStandardAction(
  UPDATE_CARD_SUCCESS
)<Animal>();

/* export const loadCardsAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get<Animal[]>("http://localhost:3001/card");
      dispatch(loadCardsSuccessAction(data));
    } catch (e) {
      dispatch(errorAction(e.message));
    }
  };
}; */

export type AdminActions = ActionType<
  | typeof loadCardsAction
  | typeof loadCardsSuccessAction
  | typeof deleteCardAction
  | typeof deleteCardSuccessAction
  | typeof createCardAction
  | typeof createCardSuccessAction
  | typeof updateCardAction
  | typeof updateCardSuccessAction
  | typeof errorAction
>;

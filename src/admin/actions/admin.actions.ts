import { deprecated } from "typesafe-actions";
import Animal from "../../shared/models/Animal";

export const DELETE_CARD = "DELETE_CARD";
export type DELETE_CARD = typeof DELETE_CARD;

export const CREATE_CARD = "CREATE_CARD";
export type CREATE_CARD = typeof CREATE_CARD;

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
export const deleteCardAction = createStandardAction(DELETE_CARD)<number>();
export const createCardAction = createStandardAction(CREATE_CARD)<Animal>();
export const updateCardAction = createStandardAction(UPDATE_CARD)<Animal>();

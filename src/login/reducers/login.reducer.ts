import { ActionType } from "typesafe-actions";
import update from "immutability-helper";

import {
  loginSuccessAction,
  logoutAction,
  LOGIN_SUCCESS,
  loginErrorAction,
  LOGIN_ERROR,
  LOGOUT,
} from "../actions/login.actions";

export interface State {
  token: string;
  error: boolean;
}

export default function (
  state: State = { token: "", error: false },
  action: ActionType<
    typeof loginSuccessAction | typeof loginErrorAction | typeof logoutAction
  >
): State {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return update(state, {
        token: { $set: action.payload },
        error: { $set: false },
      });
    case LOGIN_ERROR:
      return update(state, {
        token: { $set: "" },
        error: { $set: true },
      });
    case LOGOUT:
      return update(state, {
        token: { $set: "" },
        error: { $set: false },
      });

    default:
      return state;
  }
}

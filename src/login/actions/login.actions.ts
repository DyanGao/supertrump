import { deprecated, ActionType } from "typesafe-actions";

export const LOGIN = "LOGIN";
export type LOGIN = typeof LOGIN;

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const LOGIN_ERROR = "LOGIN_ERROR";
export type LOGIN_ERROR = typeof LOGIN_ERROR;

export const LOGOUT = "LOGOUT";
export type LOGOUT = typeof LOGOUT;

export const UNAUTHORIZED_ERROR = "UNAUTHORIZED_ERROR";
export type UNAUTHORIZED_ERROR = typeof UNAUTHORIZED_ERROR;

const { createStandardAction } = deprecated;
export const loginAction = createStandardAction(LOGIN)<{
  username: string;
  password: string;
}>();
export const loginSuccessAction = createStandardAction(LOGIN_SUCCESS)<string>();
export const loginErrorAction = createStandardAction(LOGIN_ERROR)<void>();
export const logoutAction = createStandardAction(LOGOUT)<void>();
export const unauthorizedErrorAction = createStandardAction(UNAUTHORIZED_ERROR)<
  void
>();

export type LoginActions = ActionType<
  | typeof loginAction
  | typeof loginSuccessAction
  | typeof loginErrorAction
  | typeof logoutAction
  | typeof unauthorizedErrorAction
>;

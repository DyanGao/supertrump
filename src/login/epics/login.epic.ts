import axios from "axios";
import { combineEpics, ofType, Epic } from "redux-observable";
import {
  LOGIN,
  loginSuccessAction,
  loginErrorAction,
  LOGIN_SUCCESS,
  UNAUTHORIZED_ERROR,
  LOGOUT,
} from "../actions/login.actions";
import { switchMap, catchError, map, mapTo } from "rxjs/operators";
import { from, of } from "rxjs";
import { push } from "connected-react-router";

const login: Epic = (action$) =>
  action$.pipe(
    ofType(LOGIN),
    switchMap(({ payload }) =>
      from(axios.post<string>("http://localhost:3001/login", payload)).pipe(
        map(({ data: token }) => loginSuccessAction(token)),
        catchError(() => of(loginErrorAction()))
      )
    )
  );

//const loginSuccess: Epic = (action$) =>
//  action$.pipe(ofType(LOGIN_SUCCESS), mapTo(push("/")));

//const logout: Epic = (action$) =>
//  action$.pipe(ofType(LOGOUT), mapTo(push("/")));

const redirectToStart: Epic = (action$) =>
  action$.pipe(
    ofType(LOGIN_SUCCESS, LOGOUT, UNAUTHORIZED_ERROR),
    mapTo(push("/"))
  );

export default combineEpics(login, redirectToStart);

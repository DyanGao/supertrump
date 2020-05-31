import { combineEpics, ofType, Epic } from "redux-observable";
import { from, of, Observable } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import {
  LOAD_CARDS,
  loadCardsSuccessAction,
  errorAction,
  DELETE_CARD,
  deleteCardSuccessAction,
  CREATE_CARD,
  UPDATE_CARD,
  updateCardSuccessAction,
  createCardSuccessAction,
} from "../actions/admin.actions";
import Animal from "../../shared/models/Animal";
import { unauthorizedErrorAction } from "../../login/actions/login.actions";
import { ActionType } from "typesafe-actions";
import { getToken } from "../../login/selectors/login.selectors";

function handleError(
  err: AxiosError
): Observable<ActionType<typeof unauthorizedErrorAction | typeof errorAction>> {
  if (err.response!.status === 401) {
    return of(unauthorizedErrorAction());
  }
  return of(errorAction(err.toString()));
}

function getConfig(token: string): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function prepareForRequest(
  animal: Animal,
  token: string
): [FormData, AxiosRequestConfig] {
  const data = new FormData();
  data.append("name", animal.name);
  data.append("image", animal.image);
  data.append("size", animal.size.toString());
  data.append("weight", animal.weight.toString());
  data.append("age", animal.age.toString());
  data.append("offspring", animal.offspring.toString());
  data.append("speed", animal.speed.toString());

  const config = getConfig(token);
  config.headers["content-type"] = "multipart/form-data";
  return [data, config];
}

const loadCards: Epic = (action$, state$) =>
  action$.pipe(
    ofType(LOAD_CARDS),
    switchMap(() =>
      from(
        axios.get<Animal[]>(
          "http://localhost:3001/card",
          getConfig(getToken(state$.value))
        )
      ).pipe(
        map(({ data }) => loadCardsSuccessAction(data)),
        catchError(handleError)
      )
    )
  );

const deleteCard: Epic = (action$, state$) =>
  action$.pipe(
    ofType(DELETE_CARD),
    switchMap(({ payload: id }) =>
      from(
        axios.delete(
          `http://localhost:3001/card/${id}`,
          getConfig(getToken(state$.value))
        )
      ).pipe(
        map(() => deleteCardSuccessAction(id)),
        catchError(handleError)
      )
    )
  );

const createCard: Epic = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_CARD),
    switchMap(({ payload: animal }) => {
      const [data, config] = prepareForRequest(animal, getToken(state$.value));
      return from(axios.post(`http://localhost:3001/card/`, data, config)).pipe(
        map(({ data }) => createCardSuccessAction(data)),
        catchError(handleError)
      );
    })
  );

const updateCard: Epic = (action$, state$) =>
  action$.pipe(
    ofType(UPDATE_CARD),
    switchMap(({ payload: animal }) => {
      const [data, config] = prepareForRequest(animal, getToken(state$.value));
      return from(
        axios.put(`http://localhost:3001/card/${animal.id}`, data, config)
      ).pipe(
        map(({ data }) => updateCardSuccessAction(data)),
        catchError(handleError)
      );
    })
  );
export default combineEpics(loadCards, deleteCard, createCard, updateCard);

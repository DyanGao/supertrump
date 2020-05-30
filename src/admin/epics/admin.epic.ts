import { combineEpics, ofType, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import axios, { AxiosRequestConfig } from "axios";
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

const loadCards: Epic = (action$) =>
  action$.pipe(
    ofType(LOAD_CARDS),
    switchMap(() =>
      from(axios.get<Animal[]>("http://localhost:3001/card")).pipe(
        map(({ data }) => loadCardsSuccessAction(data)),
        catchError((err) => of(errorAction(err)))
      )
    )
  );

const deleteCard: Epic = (action$) =>
  action$.pipe(
    ofType(DELETE_CARD),
    switchMap(({ payload: id }) =>
      from(axios.delete(`http://localhost:3001/card/${id}`)).pipe(
        map(() => deleteCardSuccessAction(id)),
        catchError((err) => of(errorAction(err)))
      )
    )
  );

function prepareForRequest(animal: Animal): [FormData, AxiosRequestConfig] {
  const data = new FormData();
  data.append("name", animal.name);
  data.append("image", animal.image);
  data.append("size", animal.size.toString());
  data.append("weight", animal.weight.toString());
  data.append("age", animal.age.toString());
  data.append("offspring", animal.offspring.toString());
  data.append("speed", animal.speed.toString());

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return [data, config];
}

const createCard: Epic = (action$) =>
  action$.pipe(
    ofType(CREATE_CARD),
    switchMap(({ payload: animal }) => {
      const [data, config] = prepareForRequest(animal);
      return from(axios.post(`http://localhost:3001/card/`, data, config)).pipe(
        map(({ data }) => createCardSuccessAction(data)),
        catchError((err) => of(errorAction(err)))
      );
    })
  );

const updateCard: Epic = (action$) =>
  action$.pipe(
    ofType(UPDATE_CARD),
    switchMap(({ payload: animal }) => {
      const [data, config] = prepareForRequest(animal);
      return from(
        axios.put(`http://localhost:3001/card/${animal.id}`, data, config)
      ).pipe(
        map(({ data }) => updateCardSuccessAction(data)),
        catchError((err) => of(errorAction(err)))
      );
    })
  );
export default combineEpics(loadCards, deleteCard, createCard, updateCard);

import { takeLatest, put } from "@redux-saga/core/effects";
import axios from "axios";
import { ActionType } from "typesafe-actions";
import {
  LOAD_CARDS,
  loadCardsSuccessAction,
  errorAction,
  DELETE_CARD,
  deleteCardSuccessAction,
  deleteCardAction,
  createCardAction,
  updateCardAction,
  CREATE_CARD,
  UPDATE_CARD,
  updateCardSuccessAction,
  createCardSuccessAction,
} from "../actions/admin.actions";
import Animal from "../../shared/models/Animal";

function* loadCards() {
  try {
    const { data } = yield axios.get<Animal[]>("http://loacalhost:3001/card");
    yield put(loadCardsSuccessAction(data));
  } catch (e) {
    yield put(errorAction(e.message));
  }
}

function* deleteCard({ payload: id }: ActionType<typeof deleteCardAction>) {
  try {
    yield axios.delete(`http://localhost:3001/card/${id}`);
    yield put(deleteCardSuccessAction(id));
  } catch (e) {
    yield put(errorAction(e.message));
  }
}

function* saveCard({
  payload: animal,
}: ActionType<typeof createCardAction | typeof updateCardAction>) {
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
  try {
    if (animal.id) {
      const { data: updatedAnimal } = yield axios.put<Animal>(
        `http://loacalhost:3001/card/${animal.id}`,
        data,
        config
      );
      yield put(updateCardSuccessAction(updatedAnimal));
    } else {
      const { data: newAnimal } = yield axios.post<Animal>(
        "http://localhost:3001/card",
        data,
        config
      );
      yield put(createCardSuccessAction(newAnimal));
    }
  } catch (e) {
    yield put(errorAction(e.message));
  }
}

export default function* adminSaga() {
  yield takeLatest(LOAD_CARDS, loadCards);
  yield takeLatest(DELETE_CARD, deleteCard);
  yield takeLatest(CREATE_CARD, saveCard);
  yield takeLatest(UPDATE_CARD, saveCard);
}

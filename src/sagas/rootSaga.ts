import { all } from "@redux-saga/core/effects";
import adminSaga from "../admin/sagas/admin.saga";

export default function* rootSaga() {
  yield all([adminSaga()]);
}

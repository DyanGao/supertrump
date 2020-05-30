import { createStore, applyMiddleware } from "redux";
import rootReducer, { AppState } from "../reducers/rootReducer";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "../epics/rootEpics";
import { AllActions } from "../actions/actions";

export function configureStore() {
  const epicMiddleware = createEpicMiddleware<
    AllActions,
    AllActions,
    AppState
  >();
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);
  return store;
}

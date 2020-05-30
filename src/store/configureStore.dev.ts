import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import rootReducer, { AppState } from "../reducers/rootReducer";
import rootEpic from "../epics/rootEpics";
import { AllActions } from "../actions/actions";

//export function configureStore() {
//  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
//}

export function configureStore() {
  const epicMiddleware = createEpicMiddleware<
    AllActions,
    AllActions,
    AppState
  >();

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);
  return store;
}

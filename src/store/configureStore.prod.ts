import { createStore, applyMiddleware } from "redux";
import rootReducer, { AppState } from "../reducers/rootReducer";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "../epics/rootEpics";
import { AllActions } from "../actions/actions";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { getDefaultLocale, getMessagesForLocale } from "../i18n/util/i18n";

export const history = createBrowserHistory();

export function configureStore() {
  const locale = getDefaultLocale();
  const epicMiddleware = createEpicMiddleware<
    AllActions,
    AllActions,
    AppState
  >();
  const store = createStore(
    rootReducer(history),
    {
      intl: {
        locale,
        messages: getMessagesForLocale(locale),
      },
    },
    applyMiddleware(routerMiddleware(history), epicMiddleware)
  );

  epicMiddleware.run(rootEpic);
  return store;
}

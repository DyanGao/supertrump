import { AppState } from "../../reducers/rootReducer";

export function getLocale(state: AppState) {
  return state.intl.locale;
}

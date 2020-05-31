import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import adminReducer from "../admin/reducers/admin.reducer";
import loginReducer from "../login/reducers/login.reducer";
import { History } from "history";

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    admin: adminReducer,
    login: loginReducer,
  });

export type AppState = ReturnType<ReturnType<typeof combineReducers>>;

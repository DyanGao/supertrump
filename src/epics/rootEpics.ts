import { combineEpics } from "redux-observable";
import adminEpic from "../admin/epics/admin.epic";
import loginEpic from "../login/epics/login.epic";

export default combineEpics(adminEpic, loginEpic);

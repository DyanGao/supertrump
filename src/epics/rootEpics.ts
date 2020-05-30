import { combineEpics } from "redux-observable";
import adminEpic from "../admin/epics/admin.epic";

export default combineEpics(adminEpic);

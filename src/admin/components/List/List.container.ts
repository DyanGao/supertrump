import { connect } from "react-redux";
import List from "./List";
import { AppState } from "../../../reducers/rootReducer";
import { getFavourites } from "./../../selectors/admin.selectors";
import { Dispatch } from "redux";
import { deleteCardAction } from "../../actions/admin.actions";

function mapStateToProps(state: AppState) {
  return {
    animals: getFavourites(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onDelete(id: number) {
      dispatch(deleteCardAction(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

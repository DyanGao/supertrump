import { connect } from "react-redux";
import Form from "./Form";
import { AppState } from "./../../../reducers/rootReducer";
import { getCard } from "../../selectors/admin.selectors";
import Animal from "../../../shared/models/Animal";
import {
  updateCardAction,
  createCardAction,
} from "../../actions/admin.actions";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

interface Props {
  onSubmit: () => void;
}

function mapStateToProps(state: AppState) {
  return {
    getAnimal: getCard(state),
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<AppState, unknown, Action<any>>,
  { onSubmit }: Props
) {
  return {
    onSubmit(animal: Animal) {
      if (animal.id) {
        dispatch(updateCardAction(animal));
      } else {
        dispatch(createCardAction(animal));
      }
      onSubmit();
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);

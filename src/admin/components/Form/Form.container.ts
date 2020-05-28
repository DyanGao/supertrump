import { connect } from "react-redux";
import From from "./Form";
import { AppState } from "./../../../reducers/rootReducer";
import { getCard } from "../../selectors/admin.selectors";
import { Dispatch } from "redux";
import Animal from "../../../shared/models/Animal";
import {
  updateCardAction,
  createCardAction,
} from "../../actions/admin.actions";

interface Props {
  onSubmit: () => void;
}

function mapStateToProps(state: AppState) {
  return {
    getAnimal: getCard(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch, { onSubmit }: Props) {
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

export default connect(mapStateToProps, mapDispatchToProps)(From);

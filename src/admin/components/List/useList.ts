import { useSelector, useDispatch } from "react-redux";
import { getFavourites } from "../../selectors/admin.selectors";
import { deleteCardAction, loadCardsAction } from "../../actions/admin.actions";
import Animal from "../../../shared/models/Animal";
import { useEffect } from "react";

export default function useList(): [Animal[], (id: number) => void] {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCardsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animals = useSelector(getFavourites);

  const onDelete = (id: number) => dispatch(deleteCardAction(id));
  return [animals, onDelete];
}

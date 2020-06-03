import React, { useState, ChangeEvent } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TableSortLabel,
  Hidden,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Animal from "../../../shared/models/Animal";
import ConfirmDialog from "../../ConfirmDialog";
import { Fab, Grid, Paper, Count } from "./List.styles";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
//import { useDispatch } from "react-redux";
//import { getFavourites } from "../../selectors/admin.selectors";
//import { deleteCardAction } from "../../actions/admin.actions";
import useList from "./useList";
import { useIntl, FormattedPlural } from "react-intl";

/* interface Props {
  animals: Animal[];
  onDelete?: (id: number) => void;
  onSave?: (animal: Animal) => void;
} */

function List({ match }: RouteComponentProps) {
  const [animals, onDelete] = useList();
  //const dispatch = useDispatch();
  //const onDelete = (id: number) => dispatch(deleteCardAction(id));
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: number;
  }>({ open: false, id: 0 });

  /* const [formDialog, setFormDialog] = useState<{
    open: boolean;
    animal?: Animal;
  }>({ open: false }); */
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<{
    orderBy: keyof Animal;
    order: "asc" | "desc";
  }>({
    orderBy: "name",
    order: "desc",
  });

  const createSortHandler = (columnId: keyof Animal) => {
    return () => {
      setSort({
        orderBy: columnId,
        order: sort.order === "asc" ? "desc" : "asc",
      });
    };
  };

  const animalsToDisplay = animals.filter((animal) =>
    animal.name.toLowerCase().includes(filter.toLowerCase())
  );

  const intl = useIntl();

  return (
    <Grid container={true} mt={9}>
      <Hidden smDown>
        <Grid item md={1} />
      </Hidden>
      <Grid item xs={12} md={10}>
        <Paper padding={1}>
          <TextField
            label="Liste filtern"
            value={filter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilter(e.currentTarget.value)
            }
          />
          <Table>
            <TableHead>
              <TableRow>
                <Count>
                  <FormattedPlural
                    value={animalsToDisplay.length}
                    one={intl.formatMessage({ id: "admin.found.one" })}
                    other={intl.formatMessage(
                      { id: "admin.found.many" },
                      { count: animalsToDisplay.length }
                    )}
                  />
                </Count>
                <TableCell>
                  <TableSortLabel
                    active={sort.orderBy === "name"}
                    direction={sort.order}
                    onClick={createSortHandler("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                {(Object.keys(Animal.properties) as (keyof Animal)[]).map(
                  (property) => (
                    <TableCell align="right" key={property}>
                      <TableSortLabel
                        active={sort.orderBy === property}
                        direction={sort.order}
                        onClick={createSortHandler(property)}
                      >
                        {Animal.properties[property].label}
                        {Animal.properties[property].unit !== "" &&
                          " (" + Animal.properties[property].unit + ")"}
                      </TableSortLabel>
                    </TableCell>
                  )
                )}
                <TableCell>{/*edit*/}</TableCell>
                <TableCell>{/*delete*/}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animalsToDisplay
                /* .filter((animal) =>
                  animal.name.toLowerCase().includes(filter.toLowerCase())
                ) */
                .sort((animalA: Animal, animalB: Animal) => {
                  let result = 0;
                  if (animalB[sort.orderBy]! < animalA[sort.orderBy]!) {
                    result = -1;
                  }
                  if (animalB[sort.orderBy]! > animalA[sort.orderBy]!) {
                    result = 1;
                  }
                  return sort.order === "asc" ? result * -1 : result;
                })
                .map((animal) => (
                  <TableRow key={animal.id}>
                    <TableCell>{animal.name}</TableCell>
                    {(Object.keys(Animal.properties) as (keyof Animal)[]).map(
                      (property) => (
                        <TableCell key={property} align="right">
                          {animal[property]}
                        </TableCell>
                      )
                    )}
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setDeleteDialog({ open: true, id: animal.id! });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Link to={`${match!.url}/edit/${animal.id}`}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Hidden smDown>
        <Grid item md={1} />
      </Hidden>
      <ConfirmDialog
        title="Wirklich löschen?"
        text="Möchten Sie das gewählte Element wirklich löschen?"
        open={deleteDialog.open}
        onClose={(confirm) => {
          if (confirm) {
            onDelete(deleteDialog.id);
          }
          setDeleteDialog({
            id: 0,
            open: false,
          });
        }}
      />
      <Link to={`${match.url}/new`}>
        <Fab color="primary" aria-label="Add">
          <AddIcon />
        </Fab>
      </Link>
    </Grid>
  );
}

export default withRouter(List);

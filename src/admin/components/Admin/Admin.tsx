import React from "react";
import List from "../List/List";
import Form from "../../components/Form/Form.container";
import { Route, withRouter, RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";
import { getError } from "../../selectors/admin.selectors";
import { Paper } from "./Admin.styles";

function Admin({ match: adminRouteMatch }: RouteComponentProps) {
  const error = useSelector(getError);
  if (error) {
    return (
      <Paper p={1} mt={9} mx={1}>
        Es ist ein Fehler aufgetreten, bitte kontaktieren Sie Ihren
        Administrator.
      </Paper>
    );
  } else {
    return (
      <>
        <List />
        <Route
          path={[
            `${adminRouteMatch.url}/edit/:id`,
            `${adminRouteMatch.url}/new`,
          ]}
          render={({ match, history }) => {
            return (
              <Form
                onSubmit={() => {
                  history.push("/admin");
                }}
                id={parseInt(match!.params.id, 10)}
                onClose={() => history.push("/admin")}
              />
            );
          }}
        />
      </>
    );
  }
}

export default withRouter(Admin);

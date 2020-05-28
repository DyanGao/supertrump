import React from "react";
import List from "./List/List.container";
import From from "../components/Form/Form.container";
import { Route, withRouter, RouteComponentProps } from "react-router";

function Admin({ match: adminRouteMatch }: RouteComponentProps) {
  return (
    <>
      <List />
      <Route
        path={[`${adminRouteMatch.url}/edit/:id`, `${adminRouteMatch.url}/new`]}
        render={({ match, history }) => {
          return (
            <From
              onSubmit={() => {
                history.push("/admin");
              }}
              open
              id={parseInt(match!.params.id, 10)}
              onClose={() => history.push("/admin")}
            />
          );
        }}
      />
    </>
  );
}

export default withRouter(Admin);
